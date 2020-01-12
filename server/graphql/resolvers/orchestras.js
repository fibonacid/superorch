const Orchestra = require("../../models/orchestras");
const User = require("../../models/users");
const Member = require("../../models/members");

const transformOrchestra = require("../../transforms/orchestra");

module.exports = {
  orchestras: async (_, __, context) => {
    try {
      const orchestras = await Orchestra.find();
      return orchestras.map(orchestra =>
        transformOrchestra(orchestra, context)
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  createOrchestra: async (_, args, { isAuth, userId, orchestraLoader }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated");
    }

    const orchestra = await Orchestra.create({
      name: args.name,
      owner: userId
    });

    const owner = await User.findById(userId);

    if (!owner) {
      throw new Error("User doesn't exist");
    }
    owner.createdOrchestras.push(orchestra);
    await owner.save();

    // Add user as member of the orchestra
    const member = await Member.create({
      userId: owner.id,
      orchestraId: orchestra.id
    });

    orchestra.members.push(member);
    const result = await orchestra.save();

    return orchestraLoader.load(result.id);
  }
};
