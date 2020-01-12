const DataLoader = require("dataloader");
const User = require("../models/users");

const batchUsers = async ids => {
  console.log(ids);
  const users = await User.find({ _id: { $in: ids } });

  const userMap = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id] || new Error(`No result for ${id}`));
};

module.exports = userLoader = () => new DataLoader(batchUsers);
