import { ApolloError } from 'apollo-server-errors';
import { checkSuspensionForUser, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function head(_, { id }, context) {
	try {
		const head = await prisma.head.findFirst({ where: { id } });
		return checkSuspensionForUser(context, head);
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
