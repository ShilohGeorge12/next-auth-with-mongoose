// import 'server-only';

import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { MongoDB } from '@/db';
import { Users_DB_Type } from '@/types';

export const BASE_PATH = '/api/auth';

export const authOptions: NextAuthOptions = {
	secret: process.env.SECRET,
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const user = await MongoDB.getUsers().findOne({ email: credentials?.email });
				if (!user) {
					return null as any;
				}

				const isValidUser = user.password === credentials?.password;

				return isValidUser ? { _id: user._id, email: user.email, name: user.name } : null;
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// token.id = user.id; // Save the user ID to the token
				token.email = user.email; // Save user email if you need it
				token.name = user.name; // Save user name, optional
			}
			return token;
		},
		async session({ session, token }) {
			if (session && session.user) {
				session.user.email = token.email;
				session.user.name = token.name;
			}
			return session;
		},
	},
};
