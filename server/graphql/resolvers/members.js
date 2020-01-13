const Member = require("../../models/members");
const { transformMember } = require("./transforms");

module.exports = {
  members: async (_, { orchestraId }, { isAuth, loaders }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const members = await Member.find({ orchestra: orchestraId });

    return members.map(member => transformMember(member.id, loaders));
  }
};
