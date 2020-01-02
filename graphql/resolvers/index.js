const authResolver = require("./auth");
const eventsResolver = require("./events");

const rootResolver = {
  Query: {
    login: authResolver.login,
    events: eventsResolver.events,
    users: authResolver.users
  },
  Mutation: {
    createUser: authResolver.createUser,
    updateUser: authResolver.updateUser, 
    createEvent: eventsResolver.createEvent,
  },
  Subscription: {
    userJoined: authResolver.userJoined,
  }
};

module.exports = rootResolver;
