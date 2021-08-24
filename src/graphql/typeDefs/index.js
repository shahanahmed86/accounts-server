import rootSchema from './root';
import adminSchema from './admin';
import userSchema from './user';
import headSchema from './head';
import transactionSchema from './transaction';

const typeDefs = [rootSchema, adminSchema, userSchema, headSchema, transactionSchema];

export default typeDefs;
