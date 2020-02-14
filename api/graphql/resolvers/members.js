const Orchestra = require("../../models/orchestras");
const Member = require("../../models/members");
const { transformMember } = require("./_transforms");

exports.Query = {
  //
  // Members
  //
  members: async (_, { orchestraId }, { isAuth, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const members = await Member.find({
      orchestra: orchestraId
    });

    return members.map(member => transformMember(member.id, loaders));
  },

  member: async (
    _,
    { orchestraId, memberId },
    { userId, isAuth, loaders }
  ) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      // Check if member exists
      const member = await Member.findById(memberId);
      if (!member) {
        throw new Error("Member doesn't exist");
      }

      // Check if both users belong to the same orchestra
      const orchestra = await Orchestra.findById(orchestraId);
      const members = await Member.find({
        _id: { $in: orchestra._doc.members }
      });

      if (
        !members.some(member => member.id.toString() === memberId) ||
        !members.some(member => member.user.toString() === userId)
      ) {
        throw new Error("Unauthorized");
      }

      return transformMember(member.id, loaders);
    } catch (err) {
      return err;
    }
  }
};
