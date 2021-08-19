const { gql } = require('apollo-server-express');

const userSchema = gql`
	type User {
		id: String!
		username: String
		gender: Gender
		firstName: String
		lastName: String
		email: String
		emailVerified: Boolean!
		cell: String
		cellVerified: Boolean!
		avatar: String
		signupVia: String!
		heads: [Head!]
		transactions: [Transaction!]
		entries: [Entry!]
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	enum Gender {
		MALE
		FEMALE
	}

	extend type Query {
		users: [User!] @auth(shouldAdmin: true)
		user(id: String): User @auth(shouldAdmin: true, shouldUser: true)
	}

	extend type Mutation {
		signUpUser(
			username: String!
			password: String!
			confirmPassword: String!
			gender: Gender!
			firstName: String!
			lastName: String!
			email: String!
			cell: String!
			avatar: Upload!
		): User @guest(shouldUser: true)
		suspendUser(id: String!): User @auth(shouldAdmin: true)
		restoreSuspendedUser(id: String!): User @auth(shouldAdmin: true)
		sendEmailVerification(email: String!): Status!
		sendCellVerificationCode(cell: String!): Status!
		verifyCell(cell: String!, otp: String!): Status!
		socialLogin(token: String!): User! @guest(shouldUser: true)
		signInUser(username: String!, password: String!): User @guest(shouldUser: true)
		signOutUser: Boolean! @auth(shouldUser: true)
	}
`;

export default userSchema;
