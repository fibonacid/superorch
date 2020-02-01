const { PubSub } = require("apollo-server-express");
const Channel = require("../../models/channel");
const Message = require("../../models/message");
const Member = require("../../models/members");
const { transformMessage } = require("./_transforms");

const NEW_PRIVATE_MESSAGE = "NEW_PRIVATE_MESSAGE";
const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const pubsub = new PubSub();

exports.Mutation = {
  sendMessageToMember: async (
     _,
    messageInput,
    { isAuth, userId, loaders }
  ) => {
    return new Error("Not implemented yet");
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
      const member = await Member.find({ user: userId });
      if (!member) {
         return new Error("Member doesn't exist")
      }

      // Create message
      const message = await Message.create({
         channel,
         from: member,
         orchestra: member.orchestra,
         context: messageInput.context,
         format: messageInput.format,
         value: messageInput.value,
         body: messageInput.body
      })
      console.log(message);

      return message._doc
      //return transformMessage(message, loaders);
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
