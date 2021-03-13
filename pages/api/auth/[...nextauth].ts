import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import bcrypt from 'bcryptjs'

import * as env from '@/utils/env'
import { IUserDoc } from '@/interfaces/user'
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
	jwt: {
		secret: env.getSecret()
	}
}

export default NextAuth(options)