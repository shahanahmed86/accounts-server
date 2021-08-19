import { checkSuspensionForUser, prisma } from '../../utils';

export async function credit(root, _, context) {
	const credit = await prisma.entry.findUnique({ where: { id: root.id } }).credit();
	return checkSuspensionForUser(context, credit);
}
