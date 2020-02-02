const { dateToString } = require("../../helpers/date");

//
// Transform User
//
async function transformUser(
  userId,
  { userLoader, orchestraLoader, memberLoader, inviteLoader }
) {
  const user = await userLoader.load(userId.toString());

  const createdOrchestras = await orchestraLoader.loadMany(
    user._doc.createdOrchestras.map(id => id.toString())
  );

  const memberOf = await orchestraLoader.loadMany(
    user._doc.createdOrchestras.map(id => id.toString())
  );

  const sentInvites = await inviteLoader.loadMany(
    user._doc.sentInvites.map(id => id.toString())
  );

  const receivedInvites = await inviteLoader.loadMany(
    user._doc.receivedInvites.map(id => id.toString())
  );

  return {
    ...user._doc,
    birthdate: dateToString(user._doc.birthdate),
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
    })),
    sentInvites: sentInvites.map(invite => ({
      ...invite._doc,
      subject: orchestraLoader.load(invite._doc.subject.toString()),
      from: userLoader.load(invite._doc.from.toString()),
      to: userLoader.load(invite._doc.to.toString())
    })),
    receivedInvites: receivedInvites.map(invite => ({
      ...invite._doc,
      subject: orchestraLoader.load(invite._doc.subject.toString()),
      from: userLoader.load(invite._doc.from.toString()),
      to: userLoader.load(invite._doc.to.toString())
    }))
  };
}

//
// Transform Orchestra
//
async function transformOrchestra(
  orchestraId,
  { userLoader, orchestraLoader, memberLoader, channelLoader }
) {
  const orchestra = await orchestraLoader.load(orchestraId.toString());

  const members = await memberLoader.loadMany(
    orchestra._doc.members.map(id => id.toString())
  );

  const channels = await channelLoader.loadMany(
    orchestra._doc.channels.map(id => id.toString())
  );

  return {
    ...orchestra._doc,
    owner: userLoader.load(orchestra._doc.owner.toString()),
    members: members.map(member => ({
      ...member._doc,
      user: userLoader.load(member._doc.user.toString())
    })),
    channels: channels.map(channel => ({
      ...channel._doc,
      orchestra: orchestraLoader.load(channel._doc.orchestra.toString()),
      members: members.map(member => ({
        ...member._doc,
        user: userLoader.load(member._doc.user.toString())
      }))
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


//
//  Transform Channel
//
async function transformChannel(
  channelId,
  { channelLoader, orchestraLoader, memberLoader }
) {
  const channel = await channelLoader.load(channelId.toString());

  const members = await memberLoader.loadMany(
    orchestra._doc.members.map(id => id.toString())
  );

  return {
    ...channel._doc,
    orchestra: orchestraLoader.load(channel._doc.orchestra.toString()),
    members: members.map(member => ({
      ...member._doc,
      user: userLoader.load(member._doc.user.toString())
    }))
  }
}

//
//  Transform Channel Message
//
async function transformChannelMessage(
  messageId,
  { memberLoader, messageLoader, channelLoader, orchestraLoader }
) {
  const message = await messageLoader.load(messageId.toString());

  return {
    ...message._doc,
    from: memberLoader.load(message._doc.from),
    channel: channelLoader.load(message._doc.channel),
    orchestra: orchestraLoader.load(message._doc.orchestra),
  }
}

//
//  Transform Private Message
//
async function transformPrivateMessage(
  messageId,
  { memberLoader, messageLoader, orchestraLoader }
) {
  const message = await messageLoader.load(messageId.toString());

  return {
    ...message._doc,
    from: memberLoader.load(message._doc.from),
    to: memberLoader.load(message._doc.member),
    orchestra: orchestraLoader.load(message._doc.orchestra),
  }
}

module.exports = {
  transformUser,
  transformOrchestra,
  transformMember,
  transformInvite,
  transformChannel,
  transformChannelMessage,
  transformPrivateMessage
};