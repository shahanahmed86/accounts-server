const { gql } = require('apollo-server-express');

const transactionSchema = gql`
	type Entry {
		id: String!
		type: EntryType!
		amount: Float!
		description: String!
		head: Head!
		debit: Transaction
		credit: Transaction
		user: User!
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	enum EntryType {
		DEBIT
		CREDIT
	}

	type Transaction {
		id: String!
		debits: [Entry!]
		credits: [Entry!]
		user: User!
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		transactions: [Transaction!] @auth(shouldUser: true, shouldAdmin: true)
		transaction(id: String!): Transaction @auth(shouldUser: true, shouldAdmin: true)
	}

	extend type Mutation {
		createTransaction(
			debits: [InputDebitOrCredit!]!
			credits: [InputDebitOrCredit!]!
			userId: String
		): Transaction! @auth(shouldUser: true, shouldAdmin: true)
		updateTransaction(
			id: String!
			debits: [InputDebitOrCredit!]
			credits: [InputDebitOrCredit!]
		): Transaction! @auth(shouldUser: true, shouldAdmin: true)
		suspendTransaction(id: String!): Status! @auth(shouldUser: true, shouldAdmin: true)
		restoreSuspendedTransaction(id: String!): Status! @auth(shouldUser: true, shouldAdmin: true)
	}

	input InputDebitOrCredit {
		type: EntryType!
		amount: Float!
		description: String!
		headId: String!
	}
`;

export default transactionSchema;
