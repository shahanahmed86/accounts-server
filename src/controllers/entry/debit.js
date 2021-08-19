import { checkSuspensionForUser, prisma } from '../../utils';

export async function debit(root, _, context) {
	const debit = await prisma.entry.findUnique({ where: { id: root.id } }).debit();
	return checkSuspensionForUser(context, debit);
}
