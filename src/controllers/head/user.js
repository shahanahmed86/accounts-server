import { checkSuspensionForUser, prisma } from '../../utils';

export async function user(root, _, context) {
	const user = await prisma.head.findUnique({ where: { id: root.id } }).user();
	return checkSuspensionForUser(context, user, 'id');
}
