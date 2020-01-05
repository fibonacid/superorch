const { dateToString } = require("../../helpers/date");
const { transformOrchestra } = require("./merge");

const Orchestra = require("../../models/orchestras");
const User = require("../../models/users");

module.exports = {
  orchestras: async () => {
    try {
      const orchestras = await Orchestra.find();
      return orchestras.map(orchestra => transformOrchestra(orchestra));
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  createOrchestra: async (_, args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const orchestra = new Orchestra({
      name: args.name,
      owner: req.userId
    });
    let createdOrchestra;
    try {
      const result = await orchestra.save();
      createdOrchestra = transformOrchestra(result);

      const owner = await User.findById(req.userId);

      if (!owner) {
        throw new Error("User doesn't exist");
      }
      owner.createdOrchestras.push(orchestra);
      await owner.save();

      return createdOrchestra;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
