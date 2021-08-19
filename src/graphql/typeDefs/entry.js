const { gql } = require('apollo-server-express');

const entrySchema = gql`
	type Entry {
		id: String!
		type: EntryType!
		amount: Float!
		description: String!
		head: Head!
		debit: Transaction
		credit: Transaction
		user: User
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	enum EntryType {
		DEBIT
		CREDIT
	}
`;

export default entrySchema;
