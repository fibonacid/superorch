const { PubSub } = require("apollo-server-express");
const Orchestra = require("../../models/orchestras");
const Channel = require("../../models/channel");
const Message = require("../../models/message");
const Member = require("../../models/members");
const {
  transformMessage,
} = require("./_transforms");

const NEW_PRIVATE_MESSAGE = "NEW_PRIVATE_MESSAGE";
const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const pubsub = new PubSub();


exports.Query = {
  messages: async (_, { orchestraId }, { isAuth, userId, loaders }) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }
      const orchestra = await Orchestra.findById(orchestraId);
      if (!orchestra) {
        throw new Error("Orchestra doesn't exist");
      }
      const member = await Member.findOne({
        orchestra,
        user: { _id: userId }
      })
      if (!member) {
        throw new Error("Member doesn't exist");
      }
      
      // Find messages where user is included as member 
      const privateMessages = await Message.find({
        orchestra,
        toMember: member
      });
      // console.log({privateMessages});

      // Find channels in which the user is present
      const channels = await Channel.find({
        members: {
          $in: [member]
        }
      })
      // console.log({channels});

      // Find messages sent to all the channel in which
      // the user is present
      const channelMessages = await Message.find({
        orchestra: orchestraId,
        toChannel: {
          $in: channels
        }
      })

      const messages = [
        ...privateMessages,
        ...channelMessages
      ]
      throw new Error('not implemented yet')

      return messages.map(message => transformMessage(message.id, loaders))
    } catch (err) {
      return err;
    }
  }
};

exports.Mutation = {
  sendMessageToMember: async (
    _,
    { messageInput },
    { isAuth, userId, loaders }
  ) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      // Check if member exists
      const member = await Member.findOne({ user: userId });
      if (!member) {
        return new Error("Member doesn't exist");
      }

      // Check if receiveing member exists
      const receiver = await Member.findById(messageInput.memberId);
      if (!receiver) {
        return new Error("Receiveng member doesn't exist");
      }

      // Create message
      const message = await Message.create({
        from: member,
        orchestra: member.orchestra,
        context: messageInput.context,
        format: messageInput.format,
        body: messageInput.body,
        toMember: receiver,
      });

      return transformMessage(message.id, loaders);
    } catch (err) {
      return err;
    }
  },

  sendMessageToChannel: async (
    _,
    { messageInput },
    { isAuth, userId, loaders }
  ) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      // Check if channel exists
      const channel = await Channel.findById(messageInput.channelId);
      if (!channel) {
        return new Error("Channel doesn't exist");
      }

      // Check if member exists
      const member = await Member.findOne({ user: userId });
      if (!member) {
        return new Error("Member doesn't exist");
      }

      // Create message
      const message = await Message.create({
        from: member,
        orchestra: member.orchestra,
        context: messageInput.context,
        format: messageInput.format,
        value: messageInput.value,
        body: messageInput.body,
        toChannel: channel
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
