const authResolver = require("./auth");
const orchestraResolver = require("./orchestras");
const memberResolver = require("./members");
const inviteResolver = require("./invites");

const rootResolver = {
  Query: {
    login: authResolver.login,
    orchestras: orchestraResolver.orchestras,
    singleOrchestra: orchestraResolver.singleOrchestra,
    users: authResolver.users,
    user: authResolver.user,
    members: memberResolver.members,
    invites: inviteResolver.invites
  },
  Mutation: {
    register: authResolver.register,
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
