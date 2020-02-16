const User = require("../../models/users");
const { transformUser, transformOrchestra } = require("../../helpers/transform");

module.exports = {
  User: {
    createdOrchestras: ({ createdOrchestras }, __, { loaders }) =>
      createdOrchestras.map(orchestra =>
        transformOrchestra(orchestra, loaders)
      ),
    memberOf: ({ memberOf }, __, { loaders }) =>
      memberOf.map(orchestra => transformOrchestra(orchestra, loaders)),
    sentInvites: ({ sentInvites }, __, { loaders }) =>
      sentInvites.map(invite => transformInvite(invite, loaders)),
    receivedInvites: ({ receivedInvites }, __, { loaders }) =>
      receivedInvites.map(invite => transformInvite(invite, loaders))
  },

  Query: {
    //
    // User
    //
    user: async (_, __, { loaders, userId, isAuth }) => {
      if (!isAuth || !userId) {
        return new Error("Unauthenticated");
      }
      return transformUser(userId, loaders);
    }
  },

  Mutation: {
    //
    // Update user
    //
    updateUser: async (_, { userInput }, { isAuth, userId, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthorized");
      }
      const user = await User.findByIdAndUpdate({ _id: userId }, userInput, {
        new: true
      });

      return transformUser(user.id, loaders);
    }
  }
};
