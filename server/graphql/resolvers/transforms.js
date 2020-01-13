async function transformUser(userId, { userLoader, orchestraLoader }) {
  const user = await userLoader.load(userId.toString());

  return {
    ...user._doc,
    createdOrchestras: orchestraLoader.loadMany(
      user._doc.createdOrchestras.map(id => id.toString())
    )
  };
}

async function transformOrchestra(
  orchestraId,
  { userLoader, orchestraLoader, memberLoader }
) {
  const orchestra = await orchestraLoader.load(orchestraId.toString());

  return {
    ...orchestra._doc,
    owner: userLoader.load(orchestra._doc.owner.toString()),
    members: memberLoader.loadMany(
      orchestra._doc.members.map(id => id.toString())
    )
  };
}

async function transformMember(
  memberId,
  { userLoader, orchestraLoader, memberLoader }
) {
  const member = await memberLoader.load(memberId.toString());

  return {
    ...member._doc,
    user: userLoader.load(member._doc.user.toString()),
    orchestra: orchestraLoader.load(member._doc.orchestra.toString())
  };
}

module.exports = {
  transformUser,
  transformOrchestra,
  transformMember
};
