const { PubSub, withFilter } = require("apollo-server-express");
const Orchestra = require("../../models/orchestras");
const Channel = require("../../models/channel");
const Message = require("../../models/message");
const Member = require("../../models/members");
const {
  transformChannelMessage,
  transformPrivateMessage
} = require("./_transforms");

const NEW_PRIVATE_MESSAGE = "NEW_PRIVATE_MESSAGE";
const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const pubsub = new PubSub();

exports.Query = {
  privateMessages: async (
    _,
    { pagination, orchestraId, memberId, filters },
    { userId, loaders }
  ) => {
    try {
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }

      const member = await Member.findOne({
        orchestra: orchestraId,
        user: userId
      });
      if (!member) {
        throw new Error("User doesn't belong to the orchestra");
      }

      const otherMember = await Member.findOne({
        _id: memberId,
        orchestra: orchestraId
      });
      if (!otherMember) {
        throw new Error("Member not found");
      }

      const memberIds = [member._doc._id, otherMember._doc._id];

      const query = {
        orchestra: orchestraId,
        from: {
          $in: memberIds
        },
        targetId: {
          $in: memberIds
        },
        targetType: "Member"
      };

      // If after property is specified
      // use it as cursor.
      if (pagination.after) {
        query._id = {
          $gt: pagination.after
        };
      }
      if (pagination.filters) {
        query.context = { $in: filters.contexts };
        query.format = { $in: filters.formats };
      }

      // Find all messages sent to the user by
      // the specified member
      const messages = await Message.find(query)
        .sort({ _id: "desc" })
        .limit(pagination.first);

      const total = messages.length;
      const cursor = messages[total - 1].id;

      return {
        edges: messages.map(message => ({
          node: transformPrivateMessage(message.id, loaders),
          cursor
        })),
        pageInfo: {
          hasNextPage: true
        }
      };
    } catch (err) {
      return err;
    }
  },
  channelMessages: async (
    _,
    { pagination, orchestraId, channelId, filters },
    { userId, loaders }
  ) => {
    try {
      const members = await Member.find({
        orchestra: orchestraId,
        user: userId
      });
      if (members.length === 0) {
        throw new Error("User doesn't belong to any orchestra");
      }

      // Verify that channel exists and that the user is a member.
      const channel = await Channel.findOne({
        _id: channelId,
        members: {
          $in: members
        }
      });
      if (!channel) {
        throw new Error("User doesn't belong to this channel");
      }

      // Retrieve
      const query = {
        orchestra: orchestraId,
        targetId: channelId,
        targetType: "Channel",
      };
           // If after property is specified
      // use it as cursor.
      if (pagination.after) {
        query._id = {
          $gt: pagination.after
        };
      }
      if (pagination.filters) {
        query.context = { $in: filters.contexts };
        query.format = { $in: filters.formats };
      }

      // Find all messages sent to the user by
      // the specified member
      const messages = await Message.find(query)
        .sort({ _id: "desc" })
        .limit(pagination.first);

      const total = messages.length;
      const cursor = messages[total - 1].id;

      return {
        edges: messages.map(message => ({
          node: transformChannelMessage(message.id, loaders),
          cursor
        })),
        pageInfo: {
          hasNextPage: true
        }
      };
    } catch (err) {
      return err;
    }
  }
};

exports.Mutation = {
  sendPrivateMessage: async (
    _,
    { orchestraId, memberId, messageInput },
    { isAuth, userId, loaders }
  ) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }
      // Check that the orchestra exists
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }

      // Get members involved in the communication
      const sender = await Member.findOne({ user: userId });
      const receiver = await Member.findById(memberId);

      if (!sender || !receiver) {
        throw new Error("Member doesn't exist");
      }

      // Create message
      const message = await Message.create({
        orchestra,
        ...messageInput,
        from: sender,
        targetId: receiver._doc._id,
        targetType: "Member"
      });

      // Send a NEW_MEMBER message
      pubsub.publish(NEW_PRIVATE_MESSAGE, {
        newPrivateMessage: await transformPrivateMessage(message.id, loaders)
      });

      return transformPrivateMessage(message.id, loaders);
    } catch (err) {
      return err;
    }
  },
  sendChannelMessage: async (
    _,
    { orchestraId, channelId, messageInput },
    { isAuth, userId, loaders }
  ) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }
      // Check that the orchestra exists
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }

      // Check if sending member exists
      const sender = await Member.findOne({ user: userId });
      if (!sender) {
        return new Error("Member doesn't exist");
      }

      // Check if receiving channel exists
      const receiver = await Channel.findById(channelId);
      if (!receiver) {
        return new Error("Channel doesn't exist");
      }

      // Create message
      const message = await Message.create({
        orchestra,
        ...messageInput,
        from: sender,
        targetId: receiver._doc._id,
        targetType: "Channel"
      });

      // Send a NEW_MEMBER message
      pubsub.publish(NEW_CHANNEL_MESSAGE, {
        newChannelMessage: await transformChannelMessage(message.id, loaders)
      });

      return transformChannelMessage(message.id, loaders);
    } catch (err) {
      return err;
    }
  }
};

exports.Subscription = {
  newPrivateMessage: {
    resolve: payload => payload.newPrivateMessage,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_PRIVATE_MESSAGE),
      async function(
        { newPrivateMessage },
        { memberId, filters },
        { isAuth, userId }
      ) {
        // if (!isAuth) {
        //   return false;
        // }

        // Check if message was sent by specified member
        const sender = await Member.findById(newPrivateMessage.from);
        if (sender.id != memberId) return false;

        // Check if user is the receiver of the message
        const member = await Member.findById(newPrivateMessage.targetId);
        const isReceiver = member._doc.user !== userId;
        if (!isReceiver) return false;

        // Check if message context is correct
        if (filters && filters.contexts) {
          const validContext = filters.contexts.some(
            context => context === newPrivateMessage.context
          );
          if (!validContext) return false;
        }

        // Check if message format is correct
        if (filters && filters.formats) {
          const validFormat = filters.formats.some(
            format => format === newPrivateMessage.format
          );
          if (!validFormat) return false;
        }
        return true;
      }
    )
  },

  newChannelMessage: {
    resolve: payload => payload.newChannelMessage,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
      async function(
        { newChannelMessage },
        { orchestraId, channelId, filters },
        { userId }
      ) {
        // Check if message channel is correct.
        const targetId = newChannelMessage.targetId.toString();
        if (channelId !== targetId) return false;

        // Check if user is a member of the channel
        const members = await Member.find({
          orchestra: orchestraId,
          user: userId
        });
        if (members.length === 0) return false;

        // Verify that channel exists and that the user is a member.
        const channel = await Channel.findOne({
          _id: channelId,
          members: {
            $in: members
          }
        });
        if (!channel) return false;

        // Check if message context is correct
        if (filters && filters.contexts) {
          const validContext = filters.contexts.some(
            context => context === newPrivateMessage.context
          );
          if (!validContext) return false;
        }

        // Check if message format is correct
        if (filters && filters.formats) {
          const validFormat = filters.formats.some(
            format => format === newPrivateMessage.format
          );
          if (!validFormat) return false;
        }
        return true;
      }
    )
  }
};
