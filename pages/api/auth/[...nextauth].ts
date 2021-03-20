import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import bcrypt from 'bcryptjs'

import { getSecret } from '@/utils/env'
import IUser, { IUserDoc } from '@/interfaces/user'
import dbConnect from '@/lib/db'
import User from '@/models/User'

const options: InitOptions = {
	providers: [
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'email@host.com' },
				password: { label: "Password", type: "password" }
			},
			async authorize(creds) {
				try {
					await dbConnect()

					const user = await User.findOne({ email: creds.email }).select('+password') as IUserDoc | null
					if (!user) return null

					const isValid = await bcrypt.compare(creds.password, user.password)
					if (!isValid) return null

					return user.serialize()
				} catch {
					return null
				}
			},
		})
	],
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		async jwt(token, user: IUser, account, profile, isNewUser) {
			const isSignIn = user ? true : false;
			if (isSignIn) {
				token._id = user._id;
				token.isAdmin = user.isAdmin;
			}

			return token;
		},
		async session(session, user: IUser) {
			const formattedUser = {
				_id: user._id,
				isAdmin: user.isAdmin,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
			return { ...session, user: formattedUser };
		},
	},
	jwt: {
		secret: getSecret()
	}
}

export default NextAuth(options)