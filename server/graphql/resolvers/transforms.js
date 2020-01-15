//
// Transform User
//
async function transformUser(
  userId,
  { userLoader, orchestraLoader, memberLoader }
) {
  const user = await userLoader.load(userId.toString());

  const createdOrchestras = await orchestraLoader.loadMany(
    user._doc.createdOrchestras.map(id => id.toString())
  );

  const memberOf = await orchestraLoader.loadMany(
    user._doc.createdOrchestras.map(id => id.toString())
  );

  return {
    ...user._doc,
    createdOrchestras: createdOrchestras.map(orchestra => ({
      ...orchestra._doc,
      members: memberLoader.loadMany(
        orchestra._doc.members.map(id => id.toString())
      )
    })),
    memberOf: memberOf.map(orchestra => ({
      ...orchestra._doc,
      members: memberLoader.loadMany(
        orchestra._doc.members.map(id => id.toString())
      )
    }))
  };
}

//
// Transform Orchestra
//
async function transformOrchestra(
  orchestraId,
  { userLoader, orchestraLoader, memberLoader }
) {
  const orchestra = await orchestraLoader.load(orchestraId.toString());

  const members = await memberLoader.loadMany(
    orchestra._doc.members.map(id => id.toString())
  );

  return {
    ...orchestra._doc,
    owner: userLoader.load(orchestra._doc.owner.toString()),
    members: members.map(member => ({
      ...member._doc,
      user: userLoader.load(member._doc.user.toString())
    }))
  };
}

//
// Transform Member
//
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

//
// Transform Invite
//
async function transformInvite(
  inviteId,
  { inviteLoader, userLoader, orchestraLoader }
) {
  const invite = await inviteLoader.load(inviteId.toString());

  return {
    ...invite._doc,
    subject: orchestraLoader.load(invite._doc.subject.toString()),
    from: userLoader.load(invite._doc.from.toString()),
    to: userLoader.load(invite._doc.to.toString())
  };
}

module.exports = {
  transformUser,
  transformOrchestra,
  transformMember,
  transformInvite
};
