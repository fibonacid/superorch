const Member = require("../../models/members");
const { transformMember } = require("./transforms");
const { PubSub, withFilter } = require("apollo-server-express");
const { NEW_MEMBER } = require("./subscriptions");

const pubsub = new PubSub();

exports.Query = {
  //
  // Members
  //
  members: async (_, { orchestraId }, { isAuth, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const members = await Member.find({ orchestra: orchestraId });

    return members.map(member => transformMember(member.id, loaders));
  }
};

exports.Subscription = {
  //
  // New Member
  //
  newMember: {
    resolve: payload => payload.newMember,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_MEMBER),
      (payload, variables) => {
        console.log(variables);
        return payload;
      }
    )
  }
};
