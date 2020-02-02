const { PubSub } = require("apollo-server-express");
const Orchestra = require("../../models/orchestras");
const Channel = require("../../models/channel");
const Message = require("../../models/message");
const Member = require("../../models/members");
const { transformMessage } = require("./_transforms");

const NEW_MESSAGE = "NEW_MESSAGE";

const pubsub = new PubSub();

exports.Query = {
  messages: async(
    _,
    { orchestraId, messageFilters },
    { isAuth, userId, loaders }
  ) => {
    try {
      throw new Error('Not implemented yet')
    } catch(err) {
      return err;
    }
  }
};

exports.Mutation = {
   sendMessage: async (
      _,
      { orchestraId, messageInput },
      { isAuth, userId, loaders }
   ) => {
      try {
         throw new Error('Not implemented yet')
      } catch(err) {
         return err;
      }
   }
};

exports.Subscription = {
  newMessage: {
    resolve: payload => payload.newMessage,
    subscribe: () => pubsub.asyncIterator(NEW_MESSAGE)
  }
};
