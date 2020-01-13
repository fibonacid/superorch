const authResolver = require("./auth");
const orchestraResolver = require("./orchestras");
const memberResolver = require("./members");
const inviteResolver = require("./invites");

const rootResolver = {
  Query: {
    login: authResolver.login,
    orchestras: orchestraResolver.orchestras,
    users: authResolver.users,
    members: memberResolver.members,
    invites: inviteResolver.invites
  },
  Mutation: {
    createUser: authResolver.createUser,
    updateUser: authResolver.updateUser,
    createOrchestra: orchestraResolver.createOrchestra,
    sendInvite: inviteResolver.sendInvite,
    acceptInvite: inviteResolver.acceptInvite
  },
  Subscription: {
    userJoined: authResolver.userJoined,
    newInvite: inviteResolver.newInvite
  }
};

module.exports = rootResolver;
