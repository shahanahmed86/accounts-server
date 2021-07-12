import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../../../utils';

const admin = {
	signInAdmin: async (_, { username, password }, context) => {
		const admin = await prisma.admin.findFirst({ where: { username } });
		if (!admin) throw new AuthenticationError('Not Authenticated');

		if (!bcrypt.compareSync(password, admin.password)) {
			throw new AuthenticationError('Not Authenticated');
		}

		context.req.session.adminId = admin.id;

		return admin;
	}
};

export default admin;
