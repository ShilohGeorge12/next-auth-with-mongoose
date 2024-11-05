import { Schema } from 'mongoose';

import { Users_DB_Type } from '@/types';

export function USER_SCHEMA(): Schema<Omit<Users_DB_Type, '_id'>> {
	return new Schema<Omit<Users_DB_Type, '_id'>>({
		name: {
			type: String,
			minlength: 2,
			required: [true, 'lastname can not be empty'],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Password Can not be empty'],
		},
		email: {
			type: String,
			minlength: 2,
			unique: true,
			required: [true, 'Email can not be empty'],
		},
	});
}
