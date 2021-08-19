import { checkSuspensionForUser, prisma } from '../../utils';

export async function head(root, _, context) {
	const head = await prisma.entry.findUnique({ where: { id: root.id } }).head();
	return checkSuspensionForUser(context, head);
}
