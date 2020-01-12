const DataLoader = require("dataloader");
const User = require("../models/users");
//const { orchestraLoader } = require('./orchestraLoader');

const batchUsers = async ids => {
  const users = await User.find({ _id: { $in: ids } });

  const userMap = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id] || new Error(`No result for ${id}`));
};

const userLoader = new DataLoader(batchUsers);

const transformUser = async userId => {
  const result = await userLoader.load(userId.toString());

  return {
    ...result._doc,
    password: null
    // createdOrchestras: orchestraLoader.load.bind(
    //   this,
    //   result._doc.createdOrchestras
    // )
  };
};

module.exports = {
  userLoader,
  transformUser
};
