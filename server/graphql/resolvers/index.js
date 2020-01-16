const auth = require("./auth");
const users = require("./users");
const orchestras = require("./orchestras");
const members = require("./members");
const invites = require("./invites");

const rootResolver = {
  Query: {
    ...auth.Query,
    ...users.Query,
    ...orchestras.Query,
    ...invites.Query,
    ...members.Query
  },
  Mutation: {
    ...auth.Mutation,
    ...users.Mutation,
    ...orchestras.Mutation,
    ...invites.sendInvite
  },
  Subscription: {
    ...invites.Subscription
  }
};

module.exports = rootResolver;
