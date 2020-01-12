const transformUser = async (user, context) => {
  const result = await context.userLoader.load(user.id.toString());

  return {
    ...result._doc,
    password: null
  };
};

export default transformUser;
