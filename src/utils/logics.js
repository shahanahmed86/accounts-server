import { ApolloError } from 'apollo-server-express';
import { existsSync, mkdirSync, unlinkSync, createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { prisma } from '.';

export function saveFileLocally(image, old) {
	return new Promise((resolve, reject) => {
		image.then(({ createReadStream, ...rest }) => {
			const filename = `${uuid()}-${rest.filename.replace(/ /g, '_')}`;

			// checking whether the uploads folder is exists
			if (!existsSync('./uploads')) mkdirSync('./uploads');

			// deleting if old file is given
			if (old && existsSync(`./uploads/${old}`)) unlinkSync(`./uploads/${old}`);

			createReadStream()
				.pipe(createWriteStream(path.join('./uploads', filename)))
				.on('error', (error) => reject(new Error(error.message)))
				.on('finish', () => resolve(filename));
		});
	});
}

export async function checkData({
	tableRef,
	key,
	value,
	relatedTableRef,
	relatedKey,
	relatedValue,
	title,
	id,
	checkDuplication = false,
	checkSuspension = false,
	include
}) {
	const where = { [key]: value };
	if (relatedTableRef) where[relatedTableRef] = { [relatedKey]: relatedValue };
	if (id) where.NOT = { id };
	const findFirstQuery = { where };
	if (include) findFirstQuery.include = include;
	const data = await prisma[tableRef].findFirst(findFirstQuery);

	if (checkDuplication && data) throw new ApolloError(`${title} is already created...`);

	if (!checkDuplication && !data) throw new ApolloError(`${title} not found...`);

	if (checkSuspension && data && data.isSuspended) {
		throw new ApolloError(`${title} is already deleted...`);
	}

	return data;
}

export function filterRecordForUser(context, where = {}) {
	const { id: userId, role } = context.res.locals.user;

	if (role === 'user') {
		where.userId = userId;
		where.isSuspended = false;
	}

	return where;
}

export function checkSuspensionForUser(context, data, key = 'userId') {
	const { id: userId, role } = context.res.locals.user;

	if (role === 'user' && data) {
		if (data.isSuspended) return null;
		else if (data[key] !== userId) return null;
	}

	return data;
}

export function includeProperties(where = {}, obj) {
	Object.keys(obj).map((key) => (where[key] = obj[key]));
}
