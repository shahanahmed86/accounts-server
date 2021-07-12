import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { ensureSignedIn, checkData } from '../../utils';

class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { shouldAdmin, shouldAccount, doNotThrow } = this.args;

		field.resolve = async function (...args) {
			const [, , context] = args;

			if (shouldAdmin && 'adminId' in context.req.session) {
				ensureSignedIn(context.req, doNotThrow, 'adminId');
				const admin = await checkData({
					tableRef: 'admin',
					key: 'id',
					value: context.req.session.adminId,
					title: 'Admin'
				});
				admin.password = null;
				admin.role = 'super_admin';

				context.req.user = admin;
			} else if (shouldAccount && 'accountId' in context.req.session) {
				ensureSignedIn(context.req, doNotThrow, 'accountId');
				const account = await checkData({
					tableRef: 'account',
					key: 'id',
					value: context.req.session.accountId,
					title: 'Account',
					checkSuspension: true
				});
				account.password = null;
				account.role = 'user';

				context.req.user = account;
			} else {
				throw new AuthenticationError('You must be logged in...');
			}

			return resolve.apply(this, args);
		};
	}
}

export default AuthDirective;
