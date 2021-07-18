import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function signInAdmin(_, { username, password }, context) {
	try {
		const admin = await prisma.admin.findFirst({ where: { username } });
		if (!admin) throw new AuthenticationError('Not Authenticated');

		if (!bcrypt.compareSync(password, admin.password)) {
			throw new AuthenticationError('Not Authenticated');
		}

		context.req.session.adminId = admin.id;

		return admin;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new AuthenticationError(error.message);
	}
}
