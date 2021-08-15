import { prisma } from '../../utils';

export function debit(root) {
	return prisma.entry.findUnique({ where: { id: root.id } }).debit();
}
