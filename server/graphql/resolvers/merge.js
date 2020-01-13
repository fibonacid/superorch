const DataLoader = require("dataloader");

const Orchestra = require("../../models/orchestras");
const User = require("../../models/users");

//
// User Loader
//
const userLoader = new DataLoader(async ids => {
  const users = await User.find({ _id: { $in: ids } });

  const userMap = {};
  users.forEach(u => {
    userMap[u.id] = transformOrchestra(u);
  });

  console.log(userMap);

  return ids.map(id => userMap[id] || new Error(`No result for ${id}`));
});

//
// Orchestra Loader
//
const orchestraLoader = new DataLoader(async ids => {
  const orchestras = await Orchestra.find({ _id: { $in: ids } });

  const orchestraMap = {};
  orchestras.forEach(o => {
    orchestraMap[o.id] = transformUser(o);
  });

  console.log(orchestraMap);

  return ids.map(id => orchestraMap[id] || new Error(`No result for ${id}`));
});

//
//  Transform User
//
async function transformUser(user) {
  return {
    ...user._doc,
    password: null,
    createdOrchestras: orchestraLoader.loadMany.bind(
      this,
      user._doc.createdOrchestras
    )
  };
}

//
//  Transform Orchestra
//
async function transformOrchestra(orchestra) {
  return {
    ...orchestra._doc,
    owner: userLoader.load.bind(this, orchestra._doc.owner)
  };
}

module.exports = {
  transformUser,
  transformOrchestra
};
