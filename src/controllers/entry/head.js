import { prisma } from '../../utils';

export function head(root) {
	return prisma.entry.findUnique({ where: { id: root.id } }).head();
}
