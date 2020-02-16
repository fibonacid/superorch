const Member = require("../../models/members");
const Channel = require("../../models/channel");
const {
  transformChannel,
  transformOrchestra,
  transformMember
} = require("./_transforms");

exports.Channel = {
  orchestra: ({ orchestra }, __, { loaders }) =>
    transformOrchestra(orchestra, loaders),
  members: ({ members }, __, { loaders }) =>
    members.map(member => transformMember(member, loaders))
};

exports.Query = {
  channel: async (
    _,
    { orchestraId, channelId },
    { isAuth, userId, loaders }
  ) => {
    try {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      const member = await Member.findOne({
        orchestra: orchestraId,
        user: userId
      });
      if (!member) {
        throw new Error("Member doesn't exist");
      }

      const channel = await Channel.findOne({
        _id: channelId,
        members: {
          $in: [member]
        }
      });
      if (!channel) {
        throw new Error("Channel doesn't exist");
      }

      return transformChannel(channel.id, loaders);
    } catch (err) {
      return err;
    }
  }
};
