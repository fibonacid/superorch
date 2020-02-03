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
      async ({ newPrivateMessage }, { filters }, { userId }) => {
        const member = await newPrivateMessage.targetId();
        return member.user._id === userId;
      }
    )
  },
  newChannelMessage: {
    resolve: payload => payload.newChannelMessage,
    subscribe: () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE)
  }
};
