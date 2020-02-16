const { dateToString } = require("../../helpers/date");

//
// Transform User
//
async function transformUser(userId, { userLoader }) {
  const user = await userLoader.load(userId.toString());

  return {
    ...user._doc,
    password: null
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
async function transformMember(memberId, { memberLoader }) {
  return await memberLoader.load(memberId.toString());
}

//
// Transform Invite
//
async function transformInvite(inviteId, { inviteLoader }) {
  return await inviteLoader.load(inviteId.toString());
}

//
//  Transform Channel
//
async function transformChannel(channelId, { channelLoader }) {
  return await channelLoader.load(channelId.toString());
}

async function transformChannelMessage(
  messageId,
  { memberLoader, channelLoader, messageLoader, orchestraLoader, userLoader }
) {
  const message = await messageLoader.load(messageId.toString());
  const from = await memberLoader.load(message._doc.from);

  return {
    ...message._doc,
    orchestra: orchestraLoader.load(message._doc.orchestra),
    from: {
      ...from._doc,
      user: userLoader.load(from._doc.user)
    },
    to: channelLoader.load(message._doc.targetId)
  };
}

async function transformPrivateMessage(
  messageId,
  { memberLoader, messageLoader, orchestraLoader, userLoader }
) {
  const message = await messageLoader.load(messageId.toString());
  const from = await memberLoader.load(message._doc.from);
  const to = await memberLoader.load(message._doc.targetId);

  return {
    ...message._doc,
    orchestra: orchestraLoader.load(message._doc.orchestra),
    from: {
      ...from._doc,
      user: userLoader.load(from._doc.user)
    },
    to: {
      ...to._doc,
      user: userLoader.load(to._doc.user)
    }
  };
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
