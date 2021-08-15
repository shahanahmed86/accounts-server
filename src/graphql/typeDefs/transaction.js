const { gql } = require('apollo-server-express');

const transactionSchema = gql`
	type Transaction {
		id: String!
		debits: [Entry!]
		credits: [Entry!]
		user: User!
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}
`;

export default transactionSchema;
