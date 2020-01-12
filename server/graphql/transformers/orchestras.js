const transformUser = require("./users");

const transformOrchestra = async (orchestra, context) => {
  const result = await context.orchestraLoader.load(orchestra.id.toString());

  return {
    ...result._doc,
    owner: transformUser.bind(this, result.owner, context)
  };
};

module.exports = transformOrchestra;
