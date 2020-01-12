import transformUser from "./users";

const transformOrchestra = async (orchestra, context) => {
  const result = await context.orchestraLoader.load(orchestra.id.toString());

  return {
    ...result._doc,
    owner: transformUser.bind(this, result.owner, context)
  };
};

export default transformOrchestra;
