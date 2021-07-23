const { gql } = require('apollo-server-express');

const userSchema = gql`
	type User {
		id: String!
		username: String!
		password: String
		email: String!
		cell: String!
		avatar: String
		socials: [Social!]
		createdAt: Date!
		updatedAt: Date!
	}

	type Social {
		id: String!
		avatar: String
		provider: String!
		payload: String!
		user: User!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		loggedInUser: User! @auth(shouldUser: true)
		users: [User!] @auth(shouldAdmin: true)
		user(id: String!): User @auth(shouldAdmin: true)
	}

	extend type Mutation {
		createUser(
			username: String!
			password: String!
			confirmPassword: String!
			email: String!
			cell: String!
			avatar: Upload
		): User @auth(shouldAdmin: true)
		suspendUser(id: String!): User @auth(shouldAdmin: true)
		restoreSuspendedUser(id: String!): User @auth(shouldAdmin: true)
		signInUser(username: String!, password: String!): User @guest(shouldUser: true)
		signOutUser: Boolean! @auth(shouldUser: true)
	}
`;

export default userSchema;
