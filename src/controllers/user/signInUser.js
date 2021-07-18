import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function signInUser(_, { username, password }, context) {
	try {
		const user = await prisma.user.findFirst({ where: { username } });
		if (!user) throw new AuthenticationError('Not Authenticated');

		if (!bcrypt.compareSync(password, user.password)) {
			throw new AuthenticationError('Not Authenticated');
		}

		context.req.session.userId = user.id;

		return user;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new AuthenticationError(error.message);
	}
}
