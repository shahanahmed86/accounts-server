import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import http from 'http';

// express
import app from './express';

// graphql
import { typeDefs, resolvers, schemaDirectives } from './graphql';

// env variables
import { IN_PROD, APP_HTTP, APP_HOST, APP_PORT, APP_WS } from './config';

try {
	// Provide resolver functions for your schema fields
	const server = new ApolloServer({
		introspection: true,
		playground: IN_PROD
			? false
			: {
					'request.credentials': 'include',
					shareEnabled: true
			  },
		typeDefs,
		resolvers,
		schemaDirectives,
		context: ({ req, res }) => ({ req, res }),
		uploads: {
			maxFileSize: 1024 * 1024 * 10,
			maxFiles: 1
		}
	});

	server.applyMiddleware({ app, path: '/graphql', cors: false });

	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);

	httpServer.listen(APP_PORT, () => {
		console.log(`server on ${APP_HTTP}//${APP_HOST}:${APP_PORT}${server.graphqlPath}`);
		console.log(`subscription on ${APP_WS}//${APP_HOST}:${APP_PORT}${server.subscriptionsPath}`);
	});
} catch (error) {
	console.error(error);
}
