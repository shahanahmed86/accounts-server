import bcrypt from 'bcryptjs';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { prisma } from '../../utils';
import { IN_PROD, BCRYPT_SALT } from '../../config';

export async function createUser(_, { avatar, password, confirmPassword, ...data }, context) {
	try {
		const isUserExists = await prisma.user.findFirst({ where: { username: data.username } });
		if (isUserExists) throw new ApolloError(`User '${data.username}' is already exists...`);

		if (password !== confirmPassword) throw new ApolloError(`Password mismatched...`);

		data.password = bcrypt.hashSync(password, BCRYPT_SALT);

		const user = await prisma.user.create({ data });

		return user;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new AuthenticationError(error.message);
	}
}
