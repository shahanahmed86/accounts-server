import { prisma } from '../../utils';

export function transactions(root) {
	return prisma.user.findUnique({ where: { id: root.id } }).transactions();
}
