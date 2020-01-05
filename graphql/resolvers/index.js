const authResolver = require("./auth");
const orchestraResolver = require("./orchestras");

const rootResolver = {
  Query: {
    login: authResolver.login,
    orchestras: orchestraResolver.orchestras,
    users: authResolver.users
  },
  Mutation: {
    createUser: authResolver.createUser,
    updateUser: authResolver.updateUser,
    createOrchestra: orchestraResolver.createOrchestra
  },
  Subscription: {
    userJoined: authResolver.userJoined
  }
};

module.exports = rootResolver;
