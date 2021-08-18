import { AuthenticationError } from 'apollo-server-express';
import { IN_PROD, SESSION_NAME } from '../config';
import { checkData } from '.';
import prisma from './prisma';

const signedIn = (req, key) => (key ? req.session[key] : req.session);

export const ensureSignedIn = (req, doNotThrow, key) => {
	if (!signedIn(req, key) && !doNotThrow) {
		throw new AuthenticationError('You must be signed in.');
	}
};

export const ensureSignedOut = (req, key) => {
	if (signedIn(req, key)) {
		throw new AuthenticationError('You are already signed in.');
	}
};

export const signOut = (req, res, isAdmin = false) => {
	return new Promise((resolve, reject) => {
		if (isAdmin && 'userId' in req.session) {
			delete req.session.adminId;
			resolve(true);
		} else if (!isAdmin && 'adminId' in req.session) {
			delete req.session.userId;
			resolve(true);
		} else {
			req.session.destroy((err) => {
				if (err) reject(err);

				res.clearCookie(SESSION_NAME);

				resolve(true);
			});
		}
	});
};

export const getUserData = async (
	context,
	tableRef,
	key,
	value,
	title,
	checkSuspension = false
) => {
	try {
		const user = await checkData({ tableRef, key, value, title, checkSuspension });

		return user;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		await signOut(context.req, context.res, tableRef === 'admin');
		throw new AuthenticationError('Unauthorized Access detected');
	}
};

export function getSocialUserData(uid) {
	return admin
		.auth()
		.getUser(uid)
		.then((userRecord) => userRecord.toJSON());
}

export async function getOrCreateUser({
	email,
	uid: firebase_uid,
	displayName,
	photoURL: avatar,
	providerData,
	...userData
}) {
	const [firstName, ...lastName] = displayName.split(' ');
	const data = {
		email,
		firstName,
		lastName: lastName.join(' '),
		emailVerified: true
	};
	let user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		data.socials = {
			create: {
				avatar,
				firebase_uid,
				provider: providerData.map((p) => p.providerId).join(', '),
				metadata: JSON.stringify({ providerData, ...userData })
			}
		};
		user = await prisma.user.create({ data });
	} else {
		user = await prisma.user.update({
			where: { email },
			data: {
				socials: {
					upsert: {
						where: { firebase_uid },
						create: {
							avatar,
							provider: providerData.map((p) => p.providerId).join(', '),
							metadata: JSON.stringify({ providerData, ...userData })
						}
					}
				}
			}
		});
	}

	return user;
}
