const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");

module.exports = {
  Query: {
    //
    // Login
    //
    login: async (_, { email, password }, { loaders }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User doesn't exist");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect");
      }

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
    }
  },
  Mutation: {
    //
    // Register
    //
    register: async (_, { email, password }) => {
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
    }
  }
};
