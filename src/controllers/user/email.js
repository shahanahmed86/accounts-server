import { prisma } from '../../utils';

export async function email(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (user.email) return user.email;

	if (!user.social) return null;

	return user.social.email;
}
