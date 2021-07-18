import admin from './admin';
import user from './user';

const Mutation = {
	...admin,
	...user
};

export default Mutation;
