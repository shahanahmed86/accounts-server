import { checkSuspensionForUser, prisma } from '../../utils';

export async function user(root, _, context) {
	const user = await prisma.entry.findUnique({ where: { id: root.id } }).user();
	return checkSuspensionForUser(context, user);
}
