import { prisma } from '../../utils';

export async function avatar(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (user.avatar) return user.avatar;

	if (!user.social) return null;

	return user.social.photoURL;
}
