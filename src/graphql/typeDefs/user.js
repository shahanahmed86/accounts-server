const { gql } = require('apollo-server-express');

const userSchema = gql`
	type User {
		id: String!
		username: String!
		firstName: String!
		lastName: String!
		email: String!
		emailVerified: Boolean!
		cell: String!
		cellVerified: Boolean!
		avatar: String
		socials: [Social!]
		heads: [Head!]
		transactions: [Transaction!]
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	type Social {
		id: String!
		avatar: String
		provider: String!
		metadata: String! # JSON
		user: User!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		users: [User!] @auth(shouldAdmin: true)
		user(id: String): User @auth(shouldAdmin: true, shouldUser: true)
	}

	extend type Mutation {
		createUser(
			username: String!
			password: String!
			confirmPassword: String!
			firstName: String!
			lastName: String!
			email: String!
			cell: String!
			avatar: Upload!
		): User @auth(shouldAdmin: true)
		suspendUser(id: String!): User @auth(shouldAdmin: true)
		restoreSuspendedUser(id: String!): User @auth(shouldAdmin: true)
		signInUser(username: String!, password: String!): User @guest(shouldUser: true)
		signOutUser: Boolean! @auth(shouldUser: true)
	}
`;

export default userSchema;
