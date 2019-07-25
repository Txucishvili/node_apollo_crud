import {gql} from 'apollo-server-express';

const AuthTypes = gql`
    input SignInInput {
        email: String!
        password: String!
    }

    input SignUpInput {
        firstName: String!,
        lastName: String!
        email: String!,
        password: String!
        created: String!
    }

    type Token {
        token: String!
    }

    type Mutation {
        signUp(data: SignUpInput!): Token!
        signIn(data: SignInInput!): Token!
    }
`;

export default AuthTypes;
