const authResolver = require("./auth");
const eventsResolver = require("./events");

const rootResolver = {
  Query: {
    login: authResolver.login,
    events: eventsResolver.events,
  },
  Mutation: {
    createUser: authResolver.createUser,
    createEvent: eventsResolver.createEvent,
  },
  Subscription: {
    userJoined: authResolver.userJoined,
  }
};

module.exports = rootResolver;
