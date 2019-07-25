import {gql} from 'apollo-server-express';

const UserTypes = gql`
    type User {
        _id: String
        firstName: String
        lastName: String
        email: String
        password: String
        created: String
        modified: String
    }

    type Query {
        AllUsers: [User]!
    }

    type Mutation {
        CreateUser (
            firstName: String
            lastName: String
            email: String
            password: String
            created: String
            modified: String
        ): User,
        RemoveUser(id: String): User
    }
`;

export default UserTypes;
