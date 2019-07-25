import {Posts, Users} from '../../mongoose/schemas';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const secret = 'secret_code_area';
const issuer = 'app_init';
const audience = 'app_record';

const genSalt = (salt) => {
  return bcrypt.genSaltSync(salt);
};

const genHash = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, compare) => {
  return bcrypt.compareSync(password, compare);
};

const genToken = (data) => {
  return jwt.sign(data, secret, {
    issuer,
    audience,
  });
};


const AuthResolvers = {
  Mutation: {
    signUp: async (parent, {data: data}, {Users}) => {
      let {firstName, lastName, email, password} = data;

      const userExists = await Users.findOne({email});

      if (userExists) {
        throw new Error('User already exist');
      }

      let passwordHash = await genHash(password, genSalt(saltRounds));
      const saveData = {
        firstName,
        lastName,
        password: passwordHash,
        email
      };

      const user = await new Users(saveData).save();
      user._id = user._id.toString();

      if (!user) {
        throw new Error('Invalid credentials')
      }

      const Token = genToken({id: user._id});

      return {
        token: Token
      }
    },

    signIn: async (parent, {data: data}, {Users}) => {
      const {email, password} = data;
      const user = await Users.findOne({email});

      if (!user) {
        throw new Error('Invalid credentials');
      } else if(!comparePassword(password, user.password)) {
        throw new Error('Invalid credentials');
      }

      const Token = genToken({id: user._id});

      return {
        token: Token
      }
    }
  }
};

export default AuthResolvers;
