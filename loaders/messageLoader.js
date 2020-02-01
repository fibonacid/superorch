const DataLoader = require("dataloader");
const Message = require("../models/messages");

const batchMessages = async ids => {
  const messages = await Message.find({ _id: { $in: ids } });

  const messageMap = {};
  messages.forEach(o => {
    messageMap[o.id] = o;
  });

  return ids.map(id => messageMap[id] || new Error(`No result for ${id}`));
};

module.exports = () => new DataLoader(batchMessages);
