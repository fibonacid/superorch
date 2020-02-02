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
  privateMessages: async (
    _,
    { orchestraId, messageFilters },
    { isAuth, userId, loaders }
  ) => {
    try {
      throw new Error("Not implemented yet");
    } catch (err) {
      return err;
    }
  },
  channelMessages: async (
    _,
    { orchestraId, messageFilters },
    { isAuth, userId, loaders }
  ) => {
    try {
      throw new Error("Not implemented yet");
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
      console.log({ messageInput });

      throw new Error("Not implemented yet");
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
      console.log({ messageInput });

      throw new Error("Not implemented yet");
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
