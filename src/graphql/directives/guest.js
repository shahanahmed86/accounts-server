import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { middleware } from '../../controllers';

class GuestDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;

		field.resolve = (...args) => {
			const [, , context] = args;

			middleware.checkGuest(context, this.args);

			return resolve.apply(this, args);
		};
	}
}

export default GuestDirective;
