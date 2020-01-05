const Invite = require("../../models/invites");
const User = require("../../models/users");
const Orchestra = require("../../models/orchestras");

module.exports = {
  sendInvite: async (_, { orchestraId, email }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      // Fetch orchestra to check that it actually exist
      await Orchestra.findOne({
        _id: orchestraId,
        owner: req.userId
      });

      const user = await User.findOne({ email });

      // Create a new invite
      const invite = await Invite.create({
        orchestraId,
        email,
        userId: user.id || null
      });

      const result = await invite.save();
      // todo: use result id as email token
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  acceptInvite: async (_, args) => {
    throw new Error("Not implemented yet");
  }
};
