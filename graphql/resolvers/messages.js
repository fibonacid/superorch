const { PubSub } = require("apollo-server-express");
const Orchestra = require("../../models/orchestras");
const Channel = require("../../models/channel");
const Message = require("../../models/message");
const Member = require("../../models/members");
const { transformMessage } = require("./_transforms");

const NEW_PRIVATE_MESSAGE = "NEW_PRIVATE_MESSAGE";
const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const pubsub = new PubSub();

exports.Query = {
  privateMessages: async (_, { orchestraId, filters }, { loaders }) => {
    try {
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }

      // Find all messages
      const messages = await Message.find({
        orchestra: orchestraId,
        targetType: "Member",
        context: { $in: filters.contexts },
        format: { $in: filters.formats }
      });

      return messages.map(message => transformMessage(message.id, loaders));
    } catch (err) {
      return err;
    }
  },
  channelMessages: async (_, { orchestraId, filters }, { loaders }) => {
    try {
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }

      // Find all messages
      const messages = await Message.find({
        orchestra: orchestraId,
        targetType: "Channel",
        context: { $in: filters.contexts },
        format: { $in: filters.formats }
      });
      console.log(messages);

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

      return transformMessage(message.id, loaders);
    } catch (err) {
      return err;
    }
  }
};

exports.Subscription = {
  newPrivateMessage: {
    resolve: payload => payload.newPrivateMessage,
    subscribe: () => pubsub.asyncIterator(NEW_PRIVATE_MESSAGE)
  },
  newChannelMessage: {
    resolve: payload => payload.newChannelMessage,
    subscribe: () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE)
  }
};
