const { withFilter, PubSub } = require("apollo-server-express");
const { transformInvite, transformMember } = require("./transforms");
const Invite = require("../../models/invites");
const User = require("../../models/users");
const Orchestra = require("../../models/orchestras");
const Member = require("../../models/members");

const pubsub = new PubSub();

const NEW_INVITE = "NEW_INVITE";
const NEW_MEMBER = "NEW_MEMBER";

exports.Query = {
  //
  // Invites
  //
  invites: async (_, __, { isAuth, userId, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const invites = await Invite.find({
      pending: true,
      to: userId
    });

    return invites.map(invite => transformInvite(invite.id, loaders));
  }
};

exports.Mutation = {
  //
  // Send Invite
  //
  sendInvite: async (
    _,
    { orchestraId, email },
    { isAuth, userId, loaders }
  ) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      //Check that orchestra exists and that is owner by the user
      const orchestra = await Orchestra.findOne({
        _id: orchestraId,
        owner: userId
      });

      if (!orchestra) {
        throw new Error("Invalid request");
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User doesn't exist");
      }

      // Create a new invite
      const invite = await Invite.create({
        subject: orchestraId,
        from: userId,
        to: user.id || null,
        email
      });
      const result = await invite.save();

      // Add new sent invite to the current user
      const sender = await User.findById(userId);
      sender.sentInvites.push(invite);
      await sender.save();

      // Add new receiuved invite to the other user
      user.receivedInvites.push(invite);
      await user.save();

      // Send a NEW_INVITE message
      pubsub.publish(NEW_INVITE, {
        newInvite: result
      });

      // todo: use result id as email token
      return transformInvite(result.id, loaders);
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  denyInvite: async (_, { inviteId }, { isAuth, userId, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const invite = await Invite.findOne({
      _id: inviteId,
      to: userId
    });

    if (!invite) {
      throw new Error("Invalid request");
    }

    // Update invite pending status
    invite.pending = false;
    await invite.save();

    return transformInvite(invite.id, loaders);
  },

  acceptInvite: async (_, { inviteId }, { isAuth, userId, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const invite = await Invite.findOne({
      _id: inviteId,
      to: userId
    });

    if (!invite) {
      throw new Error("Invalid request");
    }

    // Update invite pending status
    invite.pending = false;
    await invite.save();

    // Create new orchestra member
    const member = await Member.create({
      user: userId,
      orchestra: invite.subject
    });

    // Add member to orchestra
    const orchestra = await Orchestra.findById(invite.subject);
    orchestra.members.push(member);
    await orchestra.save();

    // Send a NEW_MEMBER message
    pubsub.publish(NEW_MEMBER, {
      newMember: transformMember(member.id, loaders)
    });

    // Add orchestra to the user
    const user = await User.findById(userId);
    user.memberOf.push(orchestra);
    await user.save();

    return transformMember(member.id, loaders);
  }
};

exports.Subscription = {
  //
  // New Invite
  //
  newInvite: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_INVITE),
      ({ newInvite }, __, { userId }) => {
        // If user is supposed to receive the invite:
        if (newInvite.to === userId) {
          return transformInvite(newInvite._id);
        }
      }
    )
  },

  //
  // New Member
  //
  newMember: {
    resolve: payload => payload.newMember,
    subscribe: () => pubsub.asyncIterator(NEW_MEMBER)
  }
};
