const User = require("../../models/users");
const { PubSub } = require("apollo-server-express");
const { transformUser } = require("./transforms");

const pubsub = new PubSub();

const USER_JOINED = "USER_JOINED";

module.exports = {
  Query: {
    //
    // User
    //
    user: async (_, __, { loaders, userId, isAuth }) => {
      if (!isAuth) {
        return new Error("Unauthenticated");
      }

      const user = await User.findById(userId);

      if (!user) {
        return new Error("User doesn't exist");
      }

      return transformUser(user.id, loaders);
    }
  },

  Mutation: {
    //
    // Update user
    //
    updateUser: async (_, { userInput }, { isAuth, userId, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthorized");
      }
      const user = await User.findByIdAndUpdate(userId, userInput);

      await user.save();

      return transformUser(user.id, loaders);
    }
  }
};
