// db.ts
import mongoose, { Connection, Model } from 'mongoose';

import { USER_SCHEMA } from './schema/users';

import type { Users_DB_Type } from '@/types';

class Database {
	private static instance: Database;
	private connection!: Connection;
	private usersModel: Model<Omit<Users_DB_Type, '_id'>>;

	private constructor() {
		this.connect();
		this.usersModel = this.createUserModel();
	}

	private connect() {
		mongoose.set('strictQuery', false);
		if (!process.env.DATABASE_URL) {
			throw new Error('MongoDB URL is not set!');
		}
		this.connection = mongoose.createConnection(process.env.DATABASE_URL, {
			writeConcern: { w: 'majority' },
			retryWrites: true,
		});

		this.connection.on('error', (error) => {
			if (error instanceof Error) console.error('MongoDB connection error:', error.message);
		});

		this.connection.once('open', () => {
			console.log('Connected to MongoDB');
		});
	}

	private createUserModel(): Model<Omit<Users_DB_Type, '_id'>> {
		const usersSchema = USER_SCHEMA();
		return this.connection.model<Omit<Users_DB_Type, '_id'>>('users', usersSchema);
	}

	public static getInstance(): Database {
		if (!Database.instance) {
			if (process.env.NODE_ENV === 'development') {
				// Store in global for development mode to prevent multiple instances during hot reloads
				if (!(global as any).DatabaseInstance) {
					(global as any).DatabaseInstance = new Database();
				}
				Database.instance = (global as any).DatabaseInstance;
			} else {
				// In production, simply create the instance once
				Database.instance = new Database();
			}
		}
		return Database.instance;
	}

	public getUsers(): Model<Omit<Users_DB_Type, '_id'>> {
		return this.usersModel;
	}
}

export const MongoDB = Database.getInstance();
