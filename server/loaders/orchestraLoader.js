const DataLoader = require("dataloader");
const Orchestra = require("../models/orchestras");
const { transformUser } = require("./userLoader");

const batchOrchestras = async ids => {
  const orchestras = await Orchestra.find({ _id: { $in: ids } });

  const orchestraMap = {};
  orchestras.forEach(o => {
    orchestraMap[o.id] = transformOrchestra(o);
  });

  return ids.map(id => orchestraMap[id] || new Error(`No result for ${id}`));
};

const orchestraLoader = new DataLoader(batchOrchestras);

const transformOrchestra = async orchestra => {
  return {
    ...orchestra._doc,
    owner: transformUser.bind(this, orchestra._doc.owner)
  };
};

module.exports = {
  orchestraLoader,
  transformOrchestra
};
