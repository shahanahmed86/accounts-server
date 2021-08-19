import { checkSuspensionForUser, prisma } from '../../utils';

export async function parent(root, _, context) {
	const parent = await prisma.head.findUnique({ where: { id: root.id } }).parent();
	return checkSuspensionForUser(context, parent);
}
