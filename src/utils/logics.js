import { ApolloError } from 'apollo-server-express';
import { existsSync, mkdirSync, unlinkSync, createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import cloudinary from 'cloudinary';
import path from 'path';
import { prisma } from '.';
import {
	CLOUDINARY_API as api_key,
	CLOUDINARY_NAME as cloud_name,
	CLOUDINARY_SECRET as api_secret
} from '../config';

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

export async function saveFileInCloud(image, filename) {
	await cloudinary.config({ cloud_name, api_key, api_secret });
	return new Promise((resolve, reject) => {
		image.then(({ createReadStream, ...rest }) => {
			const file = filename.split('.');
			const l = file.length;
			const format = file[l - 1];
			const public_id = file.slice(0, l - 1).join('');
			createReadStream()
				.pipe(
					cloudinary.v2.uploader.upload_stream({
						public_id,
						format,
						overwrite: true,
						folder: 'accounts-server'
					})
				)
				.on('error', (error) => reject(new Error(error.message)))
				.on('finish', () => resolve(public_id));
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
	checkSuspension = false
}) {
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
}
