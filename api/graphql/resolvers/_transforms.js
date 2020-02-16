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
async function transformOrchestra(orchestraId, { orchestraLoader }) {
  return await orchestraLoader.load(orchestraId.toString());
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
