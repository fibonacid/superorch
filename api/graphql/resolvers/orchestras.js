const Orchestra = require("../../models/orchestras");
const User = require("../../models/users");
const Member = require("../../models/members");
const Channel = require("../../models/channel");
const { transformOrchestra, transformUser, transformMember, transformChannel } = require("./_transforms");

module.exports = {

  Orchestra: {
    owner: ({ owner }, __, { loaders }) => (
       transformUser(owner, loaders)
    ),
    members: ({ members }, __, { loaders }) => (
      members.map(member => 
        transformMember(member, loaders)  
      )
    ),
    channels: ({ channels }, __, { loaders }) => (
      channels.map(channel => 
        transformChannel(channel, loaders)
      )
    )
  },

  Query: {
    //
    // Orchestras
    //
    orchestras: async (_, __, { isAuth, userId, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const orchestras = await Orchestra.find({ _id: { $in: user.memberOf } });

      return orchestras.map(orchestra =>
        transformOrchestra(orchestra.id, loaders)
      );
    },

    //
    // Single Orchestra
    //
    orchestra: async (_, { orchestraId }, { isAuth, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      const orchestra = await Orchestra.findById(orchestraId);

      return transformOrchestra(orchestra.id, loaders);
    }
  },

  Mutation: {
    //
    // Create Orchestra
    //
    createOrchestra: async (_, args, { isAuth, userId, loaders }) => {
      if (!isAuth) {
        throw new Error("Unauthenticated");
      }

      const orchestra = await Orchestra.create({
        name: args.name,
        owner: userId
      });

      const owner = await User.findById(userId);

      if (!owner) {
        throw new Error("User doesn't exist");
      }
      owner.createdOrchestras.push(orchestra);
      owner.memberOf.push(orchestra);
      await owner.save();

      // Add user as member of the orchestra
      const member = await Member.create({
        user: owner.id,
        orchestra: orchestra.id
      });
      orchestra.members.push(member);

      // Create public channel
      const public = await Channel.create({
        name: "public",
        orchestra: orchestra.id,
        members: orchestra.members
      });
      orchestra.channels.push(public);

      const result = await orchestra.save();
      return transformOrchestra(result.id, loaders);
    },

    //
    // Update Orchestra
    //
    updateOrchestra: async (
      _,
      { orchestraId, orchestraInput },
      { isAuth, userId, loaders }
    ) => {
      try {
        if (!isAuth) {
          throw new Error("Unauthorized");
        }
        const orchestra = await Orchestra.findById(orchestraId);

        if (!orchestra) {
          throw new Error("Orchestra doesn't exist");
        }

        // Check if user is a member of the orchestra
        const member = await Member.findOne({
          user: userId,
          orchestra: orchestraId
        });
        if (!member) {
          throw new Error("Unauthorized");
        }

        const result = await Orchestra.findOneAndUpdate(
          { _id: orchestraId },
          orchestraInput,
          { new: true }
        );

        return transformOrchestra(result.id, loaders);
      } catch (err) {
        console.log(err);
        return err;
      }
    },

    deleteOrchestra: async (_, { orchestraId }, { isAuth, userId }) => {
      try {
        if (!isAuth) {
          throw new Error("Unauthorized");
        }

        const orchestra = await Orchestra.findById(orchestraId);

        if (!orchestra) {
          throw new Error("Orchestra doesn't exist");
        }

        const ownerId = orchestra._doc.owner.toString();
        // Check if the user is the creator of the orchestra
        if (ownerId !== userId) {
          throw new Error("Invalid request");
        }

        // Delete orchestra
        await Orchestra.findByIdAndDelete(orchestraId);

        // Delete orchestra from the user createdOrchestras field
        const user = await User.findById(userId);
        user.createdOrchestras = user.createdOrchestras.filter(
          id => id !== orchestraId
        );
        await user.save();

        // delete orchestra from every user that is a member
        const members = await Member.find({
          _id: {
            $in: orchestra._doc.members
          }
        });
        const users = await User.find({
          _id: {
            $in: members.map(m => m._doc.user)
          }
        });

        await Promise.all(
          users.map(user => {
            user.memberOf = user._doc.memberOf.filter(o => {
              return o.toString() !== orchestraId;
            });
            user.createdOrchestras = user._doc.createdOrchestras.filter(o => {
              return o.toString() !== orchestraId;
            });
            return user.save();
          })
        );

        // finally, delete every member of the orchestra
        await Member.remove({ _id: { $in: orchestra.members } });

        //return orchestra._doc
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }
};
