import { ApolloError } from 'apollo-server-errors';
import { checkSuspensionForUser, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function transaction(_, { id }, context) {
	try {
		const transaction = await prisma.transaction.findFirst({ where: { id } });
		return checkSuspensionForUser(context, transaction);
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
