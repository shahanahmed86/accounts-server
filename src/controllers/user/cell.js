import { prisma } from '../../utils';

export async function cell(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (user.cell) return user.cell;

	if (!user.social) return null;

	return user.social.phoneNumber;
}
