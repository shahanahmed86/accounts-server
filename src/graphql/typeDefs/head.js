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
`;

export default headSchema;
