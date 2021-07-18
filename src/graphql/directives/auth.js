import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { middleware } from '../../controllers';
import { defaultFieldResolver } from 'graphql';

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = async (...args) => {
			const [, , context] = args;

			await middleware.checkAuth(context, this.args);

			return resolve.apply(this, args);
		};
	}
}

export default AuthDirective;
