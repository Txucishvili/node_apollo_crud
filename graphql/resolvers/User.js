import {Users} from '../../mongoose/schemas';

const UserResolver = {
  Query: {
    AllUsers: async (parent, args, {Users}) => {
      const users = await Users.find();

      let allUsers = users.map(user => {
        user._id = user._id.toString();

        return user;
      });

      return allUsers;
    }
  },

  Mutation: {
    CreateUser: async (parent, args, {Users}) => {
      const user = await new Users(args).save();
      user._id = user._id.toString();

      return user
    },
    RemoveUser: async (parent, args, {Users}) => {
      const users = await Users.findById(args.id);
      users.remove();

      return users;
    }
  }
};

export default UserResolver;
