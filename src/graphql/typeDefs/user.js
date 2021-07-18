const { gql } = require('apollo-server-express');

const userSchema = gql`
	type User {
		id: String!
		username: String!
		password: String
		access: Access!
		createdAt: Date!
		updatedAt: Date!
	}

	enum Access {
		Admin
		Guest
	}

	extend type Query {
		loggedInUser: User! @auth(shouldUser: true)
	}

	extend type Mutation {
		signInUser(username: String!, password: String!): User! @guest(shouldUser: true)
		signOutUser: Boolean! @auth(shouldUser: true)
	}
`;

export default userSchema;
