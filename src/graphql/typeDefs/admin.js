const { gql } = require('apollo-server-express');

const adminSchema = gql`
	type Admin {
		id: String!
		username: String!
		password: String
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		loggedInAdmin: Admin! @auth(shouldAdmin: true)
	}

	extend type Mutation {
		signInAdmin(username: String!, password: String!): Admin! @guest(shouldAdmin: true)
		signOutAdmin: Boolean! @auth(shouldAdmin: true)
	}
`;

export default adminSchema;
