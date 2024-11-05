import { Types } from 'mongoose';

export interface UsersType {
	id: string;
	name: string;
	email: string;
	pasword: string;
}
export interface Users_DB_Type {
	_id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
}
