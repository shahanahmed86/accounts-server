const { gql } = require('apollo-server-express');

const headSchema = gql`
	type Head {
		id: String!
		label: String!
		nature: Nature!
		parent: Head
		children: [Head!]
		user: User!
		entries: [Entry!]
		isTransactable: Boolean!
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	enum Nature {
		ASSET
		EXPENSE
		LIABILITY
		EQUITY
		REVENUE
	}

	extend type Query {
		heads: [Head!] @auth(shouldUser: true, shouldAdmin: true)
		head(id: String!): Head @auth(shouldUser: true, shouldAdmin: true)
	}

	extend type Mutation {
		createHead(
			label: String!
			nature: Nature!
			parentId: String
			userId: String
			isTransactable: Boolean
		): Head! @auth(shouldUser: true, shouldAdmin: true)
		updateHead(id: String!, label: String, isTransactable: Boolean): Head!
			@auth(shouldUser: true, shouldAdmin: true)
		suspendHead(id: String!): Status! @auth(shouldUser: true, shouldAdmin: true)
		restoreSuspendHead(id: String!): Status! @auth(shouldUser: true, shouldAdmin: true)
	}
`;

export default headSchema;
