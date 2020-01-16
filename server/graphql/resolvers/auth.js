const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server-express");
const User = require("../../models/users");
const { transformUser } = require("./transforms");

const pubsub = new PubSub();

const USER_JOINED = "USER_JOINED";

module.exports = {
  users: async (_, __, { loaders }) => {
    const users = await User.find();
    return users.map(user => transformUser(user.id, loaders));
  },

  user: async (_, __, { loaders, userId, isAuth }) => {
    if (!isAuth) {
      return new Error("Unauthenticated");
    }

    const user = await User.findById(userId);

    if (!user) {
      return new Error("User doesn't exist");
    }

    return transformUser(user.id, loaders);
  },

  createUser: async (_, { email, password }) => {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User exists already");
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashedPassword
      });

      const result = await newUser.save();

      const token = await jwt.sign(
        { userId: result._id, email: result.email },
        "somesupersecretkey",
        {
          expiresIn: "1h"
        }
      );

      return {
        userId: result._id,
        token,
        tokenExpiration: 1
      };
    } catch (err) {
      return err;
    }
  },

  login: async (_, { email, password }, { loaders }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User doesn't exist");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect");
      }

      //Send a USER_JOINED message
      pubsub.publish(USER_JOINED, {
        userJoined: transformUser(user.id, loaders)
      });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesupersecretkey",
        { expiresIn: "1h" }
      );

      return {
        userId: user.id,
        token,
        tokenExpiration: 1
      };
    } catch (err) {
      throw err;
    }
  },

  updateUser: async (_, { userInput }, { isAuth, userId, loaders }) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthorized");
      }
      const user = await User.findByIdAndUpdate(userId, userInput);

      await user.save();

      return transformUser(user.id, loaders);
    } catch (err) {
      return err;
    }
  },

  userJoined: {
    resolve: payload => {
      return payload.userJoined;
    },
    subscribe: () => {
      return pubsub.asyncIterator(USER_JOINED);
    }
  }
};
