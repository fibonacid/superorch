const DataLoader = require("dataloader");
const User = require("../models/users");

const batchUsers = async ids => {
  const users = await User.find({ _id: { $in: ids } });

  const userMap = {};
  users.forEach(u => {
    userMap[u.id] = {
      ...u._doc,
      password: null
    };
  });

  return ids.map(id => userMap[id]);
};

module.exports = userLoader = () => new DataLoader(batchUsers);
