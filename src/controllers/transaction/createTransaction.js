import { ApolloError } from 'apollo-server-errors';
import { checkData, checkFootings, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function createTransaction(_, { userId, debits, credits, ...data }, context) {
	try {
		const { id: sessionUserId, role } = context.res.locals.user;
		const isAdmin = role === 'admin';
		if (isAdmin && !userId) throw new ApolloError('User ID is required...');

		if (role === 'user') {
			data.user = {
				connect: { id: sessionUserId }
			};
		} else {
			await checkData({
				tableRef: 'user',
				key: 'id',
				value: userId,
				title: 'User',
				checkSuspension: true
			});
			data.user = {
				connect: { id: userId }
			};
		}

		await checkFootings(debits, credits, isAdmin ? userId : sessionUserId, isAdmin);

		data.debits = {
			create: debits.map(({ headId, ...debit }) => ({
				...debit,
				head: { connect: { id: headId } }
			}))
		};

		data.credits = {
			create: credits.map(({ headId, ...credit }) => ({
				...credit,
				head: { connect: { id: headId } }
			}))
		};

		return prisma.transaction.create({ data });
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
