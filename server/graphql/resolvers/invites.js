const Invite = require("../../models/invites");
const User = require("../../models/users");
const Orchestra = require("../../models/orchestras");
const { PubSub } = require("apollo-server-express");
const { transformInvite } = require("./transforms");

const pubsub = new PubSub();

const NEW_INVITE = "NEW_INVITE";

module.exports = {
  invites: async (_, __, { isAuth, userId, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const invites = await Invite.find({ to: userId });

    return invites.map(invite => transformInvite(invite.id, loaders));
  },

  sendInvite: async (
    _,
    { orchestraId, email },
    { isAuth, userId, loaders }
  ) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    //Check that orchestra exists and that is owner by the user
    const orchestra = await Orchestra.findOne({
      _id: orchestraId,
      owner: userId
    });

    if (!orchestra) {
      throw new Error("Invalid request");
    }

    const user = await User.findOne({ email });

    // Create a new invite
    const invite = await Invite.create({
      subject: orchestraId,
      from: userId,
      to: user.id || null,
      email
    });

    const result = await invite.save();

    // Send a NEW_INVITE message
    pubsub.publish(NEW_INVITE, {
      newInvite: transformInvite(result.id, loaders)
    });

    // todo: use result id as email token
    return transformInvite(result.id, loaders);
  },

  acceptInvite: async () => {
    throw new Error("Not implemented yet");
  },

  newInvite: {
    resolve: payload => payload.newInvite,
    subscribe: () => pubsub.asyncIterator(NEW_INVITE)
  }
};
