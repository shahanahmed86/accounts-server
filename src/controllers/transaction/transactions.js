import { ApolloError } from 'apollo-server-errors';
import { filterRecordForUser, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function transactions(_, __, context) {
	try {
		const where = filterRecordForUser(context);
		return prisma.transaction.findMany({ where });
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
