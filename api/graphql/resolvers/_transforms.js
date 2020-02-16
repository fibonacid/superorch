const { dateToString } = require("../../helpers/date");

//
// Transform User
//
exports.transformUser = async (userId, { userLoader }) => {
  const user = await userLoader.load(userId.toString());

  return {
    ...user._doc,
    password: null
  };
}

//
// Transform Orchestra
//
exports.transformOrchestra = (orchestraId, { orchestraLoader }) => (
  orchestraLoader.load(orchestraId.toString())
)

//
// Transform Member
//
exports.transformMember = (memberId, { memberLoader }) => (
  memberLoader.load(memberId.toString())
)

//
// Transform Invite
//
exports.transformInvite = (inviteId, { inviteLoader }) => (
  inviteLoader.load(inviteId.toString())
)

//
//  Transform Channel
//
exports.transformChannel = (channelId, { channelLoader }) => (
  channelLoader.load(channelId.toString())
)

//
//  Transform Channel
//
exports.transformMessage = (messageId, { messageLoader }) => (
  messageLoader.load(messageId.toString())
)
