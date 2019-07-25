import {mergeTypes} from "merge-graphql-schemas";

import User from "./types/User";
import Post from "./types/Post";
import AuthTypes from "./types/Auth";

const typeDefs = [User, Post, AuthTypes];

export default mergeTypes(typeDefs, {all: true});
