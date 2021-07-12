import { ApolloError } from 'apollo-server-express';
import { existsSync, mkdirSync, unlinkSync, createWriteStream } from 'fs';
import path from 'path';
import { prisma } from '.';

export const saveFile = (pipe, image, old) => {
	return new Promise((resolve, reject) => {
		image.then(({ createReadStream, ...rest }) => {
			const filename = `${Math.random().toString(32).substr(7, 5)}-${rest.filename}`;

			// checking whether the uploads folder is exists
			if (!existsSync('./uploads')) mkdirSync('./uploads');

			// deleting if old file is given
			if (old && existsSync(`./uploads/${old}`)) unlinkSync(`./uploads/${old}`);

			const stream = createReadStream();
			pipe(createWriteStream(path.join('./uploads', filename)));

			stream
				.on('error', (error) => reject(new Error(error.message)))
				.on('finish', () => resolve(filename));
		});
	});
};

export const checkData = async ({
	tableRef,
	key,
	value,
	relatedTableRef,
	relatedKey,
	relatedValue,
	title,
	id,
	checkDuplication,
	checkSuspension
}) => {
	const where = { [key]: value };
	if (relatedTableRef) where[relatedTableRef] = { [relatedKey]: relatedValue };
	if (id) where.NOT = { id };
	const data = await prisma[tableRef].findFirst({ where });

	if (checkDuplication && data) throw new ApolloError(`${title} is already created...`);

	if (!checkDuplication && !data) throw new ApolloError(`${title} not found...`);

	if (checkSuspension && data && data.isArchived) {
		throw new ApolloError(`${title} is already deleted...`);
	}

	return data;
};
