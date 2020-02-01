const { PubSub } = require("apollo-server-express");
const Message = require("../../models/message");

const NEW_PRIVATE_MESSAGE = "NEW_PRIVATE_MESSAGE";
const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

const pubsub = new PubSub();

exports.Mutation = {
   sendMessageToMember: async () => {
      return new Error('Not implemented yet')
   },

   sendMessageToChannel: async () => {
      return new Error('Not implemented yet')
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
