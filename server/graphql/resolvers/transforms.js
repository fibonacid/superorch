async function transformUser(userId, { userLoader, orchestraLoader }) {
  const user = await userLoader.load(userId.toString());

  return {
    ...user._doc,
    createdOrchestras: orchestraLoader.loadMany(
      user._doc.createdOrchestras.map(o => o.toString())
    )
  };
}

async function transformOrchestra(
  orchestraId,
  { userLoader, orchestraLoader }
) {
  const orchestra = await orchestraLoader.load(orchestraId.toString());

  return {
    ...orchestra._doc,
    owner: userLoader.load(orchestra._doc.owner.toString())
  };
}

module.exports = {
  transformUser,
  transformOrchestra
};
