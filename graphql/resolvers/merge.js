const DataLoader = require("dataloader");

const User = require("../../models/users");
const Orchestra = require("../../models/orchestras");

const orchestraLoader = new DataLoader(orchestraIds => {
  return orchestras(orchestraIds);
});

const orchestras = async orchestraIds => {
  try {
    const orchestras = await Orchestra.find({ _id: { $in: orchestraIds } });
    console.log({ orchestras });
    return orchestras.map(orchestra => transformOrchestra(orchestra));
  } catch (err) {
    throw err;
  }
};

const singleOrchestra = async orchestraId => {
  try {
    return await orchestraLoader.load(orchestraId.toString());
  } catch (err) {
    throw err;
  }
};

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      createdOrchestras: orchestraLoader.load.bind(
        this,
        user._doc.createdOrchestras
      )
    };
  } catch (err) {
    throw err;
  }
};

const transformOrchestra = orchestra => ({
  ...orchestra._doc,
  owner: singleUser.bind(this, orchestra.owner)
});

const transformUser = async user => {
  return await singleUser(user.id);
};

exports.transformOrchestra = transformOrchestra;
exports.transformUser = transformUser;
