import { prisma } from '../../utils';

export async function avatar(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (!user.avatar) {
		if (!user.social) return null;

		const ind = Math.floor(Math.random() * user.social.length);
		return user.social[ind].avatar;
	}

	return user.avatar;
}
