import { ApolloError } from 'apollo-server-errors';
import Joi from 'joi';

export const validate = async (schema, payload) => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (error) {
		throw new ApolloError(error.message);
	}
};

export const username = Joi.string().min(4).max(30).required().label('Username');

export const password = Joi.string()
	.min(8)
	.max(50)
	.pattern(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
	.required()
	.label('Password')
	.messages({
		'string.pattern.base':
			'{#label} must have at least one lowercase letter, one uppercase letter, and one digit.',
		'string.base': '{#label} should be a type of "text"'
	});

const confirmPassword = Joi.valid(Joi.ref('password')).required();

export const email = Joi.string().email().required().label('Email');
export const cell = Joi.string().length(13).required().label('Cell');
export const firstName = Joi.string().max(254).required().label('First Name');
export const lastName = Joi.string().max(254).required().label('Last Name');

export const signUp = Joi.object().keys({
	username,
	password,
	confirmPassword,
	email,
	cell,
	firstName,
	lastName
});
