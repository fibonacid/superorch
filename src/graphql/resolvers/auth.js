const bcrypt = require("bcrypt");

const User = require("../../models/users");

module.exports = {
  createUser: async args => {
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
  }
};
