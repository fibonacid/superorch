const DataLoader = require("dataloader");
const Member = require("../models/members");

const batchMembers = async ids => {
  const members = await Member.find({ _id: { $in: ids } });

  const memberMap = {};
  members.forEach(o => {
    memberMap[o.id] = o;
  });

  return ids.map(id => memberMap[id] || new Error(`No result for ${id}`));
};

module.exports = () => new DataLoader(batchMembers);
