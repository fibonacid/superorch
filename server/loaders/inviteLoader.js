const DataLoader = require("dataloader");
const Invite = require("../models/invites");

const batchInvites = async ids => {
  const invites = await Invite.find({ _id: { $in: ids } });

  const inviteMap = {};
  invites.forEach(o => {
    inviteMap[o.id] = o;
  });

  return ids.map(id => inviteMap[id] || new Error(`No result for ${id}`));
};

module.exports = () => new DataLoader(batchInvites);
