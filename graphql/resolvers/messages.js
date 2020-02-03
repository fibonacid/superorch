const { PubSub, withFilter } = require("apollo-server-express");
const Orchestra = require("../../models/orchestras");
const Channel = require("../../models/channel");
const Message = require("../../models/message");
const Member = require("../../models/members");
const { transformMessage } = require("./_transforms");

const NEW_PRIVATE_MESSAGE = "NEW_PRIVATE_MESSAGE";
const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const pubsub = new PubSub();

exports.Query = {
  privateMessages: async (_, { orchestraId, filters }, { userId, loaders }) => {
    try {
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }

      const member = await Member.findOne({
        orchestra: orchestraId,
        user: userId
      });

      // Find all messages sent to the user
      const messages = await Message.find({
        orchestra: orchestraId,
        targetId: member._doc.id,
        targetType: "Member",
        context: { $in: filters.contexts },
        format: { $in: filters.formats }
      });

      return messages.map(message => transformMessage(message.id, loaders));
    } catch (err) {
      return err;
    }
  },
  channelMessages: async (
    _,
    { orchestraId, channelId, filters },
    { loaders }
  ) => {
    try {
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }
      // Verify that channel exists and that the user is a member.
      const channel = await Channel.findOne({
        _id: channelId,
        members: {
          $in: [{ user: userId }]
        }
      });
      if (!channel) {
        throw new Error("Invalid channel");
      }

      // Retrieve
      const messages = await Message.find({
        orchestra: orchestraId,
        targetId: channelId,
        targetType: "Channel",
        context: { $in: filters.contexts },
        format: { $in: filters.formats }
      });

      return messages.map(message => transformMessage(message.id, loaders));
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
        newPrivateMessage: await transformMessage(message.id, loaders)
      });

      return transformMessage(message.id, loaders);
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
        newChannelMessage: await transformMessage(message.id, loaders)
      });

      return transformMessage(message.id, loaders);
    } catch (err) {
      return err;
    }
  }
};

/*
{ newPrivateMessage:
   { format: 'PLAIN_TEXT',
     _id: 5e376837b3fade289e5c95a5,
     orchestra: Promise { <pending> },
     context: 'CHAT',
     body: 'Hi marco again',
     from: Promise { <pending> },
     targetId: 5e374c800c0f2722f3dfa735,
     targetType: 'Member',
     __v: 0,
     to: Promise { <pending> } } }
*/

exports.Subscription = {
  newPrivateMessage: {
    resolve: payload => payload.newPrivateMessage,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_PRIVATE_MESSAGE),
      async ({ newPrivateMessage }, { filters }, { isAuth, userId }) => {
        if (!isAuth) {
          return false;
        }
        // Check if user is the receiver of the message
        const member = await Member.findById(newPrivateMessage.targetId);
        const isReceiver = member._doc.user !== userId;
        if (!isReceiver) return false;

        // Check if message context is correct
        const validContext = filters.contexts.some(
          context => context === newPrivateMessage.context
        );
        if (!validContext) return false;

        // Check if message format is correct
        const validFormat = filters.formats.some(
          format => format === newPrivateMessage.format
        );
        if (!validFormat) return false;

        return true;
      }
    )
  },

  /*
{ 
  format: 'PLAIN_TEXT',
  _id: 5e3822c976e7952e1ca6714c,
  orchestra: Promise { <pending> },
  context: 'CHAT',
  body: 'Hello everybody again',
  from: Promise { <pending> },
  targetId: 5e374bf70c0f2722f3dfa72e,
  targetType: 'Channel',
  __v: 0,
  to: Promise { <pending> } 
}

{ 
  members: [ 5e374bf70c0f2722f3dfa72d, 5e374c800c0f2722f3dfa735 ],
    _id: 5e374bf70c0f2722f3dfa72e,
    name: 'public',
    orchestra: 5e374bf70c0f2722f3dfa72a,
    __v: 1 
}
*/

  newChannelMessage: {
    resolve: payload => payload.newChannelMessage,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
      async (
        { newChannelMessage },
        { channelId, filters },
        { isAuth, userId }
      ) => {
        // if (!isAuth) {
        //   return false;
        // }

        // Check if message channel is correct.
        const targetId = newChannelMessage.targetId.toString();
        if (channelId !== targetId) return false;

        // Check if user is a member of the channel
        const channel = await Channel.findOne({
          _id: channelId,
          members: {
            $in: [{ user: userId }]
          }
        });
        if (!channel) return false;

        // Check if message context is correct
        const validContext = filters.contexts.some(
          context => context === newPrivateMessage.context
        );
        if (!validContext) return false;

        // Check if message format is correct
        const validFormat = filters.formats.some(
          format => format === newPrivateMessage.format
        );
        if (!validFormat) return false;

        return true;
      }
    )
  }
};
