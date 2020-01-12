const transformOrchestra = async (
  orchestra,
  { orchestraLoader, userLoader }
) => {
  const result = await orchestraLoader.load(orchestra.id.toString());

  return {
    ...result._doc,
    owner: userLoader.load.bind(this, result._doc.owner)
  };
};

module.exports = transformOrchestra;
