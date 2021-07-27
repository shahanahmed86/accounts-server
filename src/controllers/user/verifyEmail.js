import { BASE_URL } from '../../config';
import { checkData, prisma, validateToken } from '../../utils';

export async function verifyEmail(_, { token }) {
	const decoded = validateToken(token);

	await checkData({
		tableRef: 'user',
		key: 'id',
		value: decoded.id,
		title: 'User',
		checkSuspension: true
	});

	await prisma.user.update({
		where: { id: decoded.id },
		data: { emailVerified: true }
	});

	return `${BASE_URL}/login`;
}
