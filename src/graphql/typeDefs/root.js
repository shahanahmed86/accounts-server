const { gql } = require('apollo-server-express');

const rootSchema = gql`
	scalar Date

	# directives
	directive @auth(
		shouldAdmin: Boolean = false
		shouldAccount: Boolean = false
		doNotThrow: Boolean = false
	) on FIELD_DEFINITION
	directive @guest(doNotThrow: Boolean = false) on FIELD_DEFINITION

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}

	type Status {
		success: Boolean!
		message: String!
		debugMessage: String
	}
`;

export default rootSchema;
