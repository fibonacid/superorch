const Invite = require("../../models/invites");
const User = require("../../models/users");
const Orchestra = require("../../models/orchestras");
const { PubSub, withFilter } = require("apollo-server-express");

const pubsub = new PubSub();

const NEW_INVITE = "NEW_INVITE";

module.exports = {
  invites: async (_, __, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const invites = await Invite.find({ userId: req.userId });
    return invites.map(invite => invite._doc);
  },
  sendInvite: async (_, { orchestraId, email }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
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

    // Send a NEW_INVITE message
    pubsub.publish(NEW_INVITE, { newInvite: result._doc });

    // todo: use result id as email token
    return result._doc;
  },

  acceptInvite: async (_, args) => {
    throw new Error("Not implemented yet");
  },

  newInvite: {
    resolve: payload => payload.newInvite,
    subscribe: () => pubsub.asyncIterator(NEW_INVITE)
  }
};
