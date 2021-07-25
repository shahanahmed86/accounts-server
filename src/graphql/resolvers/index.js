import { default as Mutation } from './mutation';

import { default as Query } from './query';

import * as relations from './relations';

const resolvers = {
	Query,
	Mutation,
	...relations
};

export default resolvers;
