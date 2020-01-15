const DataLoader = require("dataloader");
const Orchestra = require("../models/orchestras");

const batchOrchestras = async ids => {
  const orchestras = await Orchestra.find({ _id: { $in: ids } });

  const orchestraMap = {};
  orchestras.forEach(o => {
    orchestraMap[o.id] = o;
  });

  return ids.map(id => orchestraMap[id] || new Error(`No result for ${id}`));
};

module.exports = () => new DataLoader(batchOrchestras);
