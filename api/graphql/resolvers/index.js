const auth = require("./auth");
const users = require("./users");
const orchestras = require("./orchestras");
const members = require("./members");
const invites = require("./invites");
const messages = require("./messages");
const channels = require("./channels");

const rootResolver = {
  User: users.User,
  Member: members.Member,
  Invite: invites.Invite,
  Query: {
    ...auth.Query,
    ...users.Query,
    ...orchestras.Query,
    ...invites.Query,
    ...members.Query,
    ...messages.Query,
    ...channels.Query
  },
  Mutation: {
    ...auth.Mutation,
    ...users.Mutation,
    ...orchestras.Mutation,
    ...invites.Mutation,
    ...messages.Mutation
  },
  Subscription: {
    ...invites.Subscription,
    ...messages.Subscription
  }
};

module.exports = rootResolver;
