const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PubSub } = require('apollo-server-express');
const { user } = require('./merge');
const User = require("../../models/users");

const pubsub = new PubSub();

const USER_JOINED = 'userJoined';

module.exports = {
  createUser: async (_, args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User exists already");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await newUser.save();
      console.log(result);

      return { ...result._doc, password: null };
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User doesn't exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect");
    }

    // Send a USER_JOINED message
    pubsub.publish(USER_JOINED, { [USER_JOINED]: user._doc })

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      "somesupersecretkey",
      {
        expiresIn: "1h"
      }
    );
     
    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  },

  userJoined: {
    subscribe: () => {
      return pubsub.asyncIterator(USER_JOINED)
    }
  }
};
