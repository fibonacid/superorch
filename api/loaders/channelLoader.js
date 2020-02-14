const DataLoader = require("dataloader");
const Channel = require("../models/channel");

const batchChannels = async ids => {
  const channels = await Channel.find({ _id: { $in: ids } });

  const channelMap = {};
  channels.forEach(o => {
    channelMap[o.id] = o;
  });

  return ids.map(id => channelMap[id] || new Error(`No result for ${id}`));
};

module.exports = () => new DataLoader(batchChannels);
