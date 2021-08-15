import rootSchema from './root';
import adminSchema from './admin';
import userSchema from './user';
import headSchema from './head';
import entrySchema from './entry';
import transactionSchema from './transaction';

const typeDefs = [rootSchema, adminSchema, userSchema, headSchema, entrySchema, transactionSchema];

export default typeDefs;
