const transformUser = async (user, { userLoader }) => {
  const result = await userLoader.load(user.id.toString());

  return {
    ...result._doc,
    password: null
  };
};

module.exports = transformUser;
