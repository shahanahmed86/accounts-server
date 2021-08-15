import { prisma } from '../../utils';

export function heads(root) {
	return prisma.user.findUnique({ where: { id: root.id } }).heads();
}
