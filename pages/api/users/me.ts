import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { QueryOptions } from "mongoose";

import { dbConnectHandler } from "@/lib/db";
import IUser, { IUserDoc } from "@/interfaces/user";
import User from "@/models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })

	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const sessionUser = session.user as IUser

	if (req.method == 'GET') {
		return res.json({ user: sessionUser })
	}

	if (req.method == 'PUT') {
		try {
			const { name, email, password } = req.body
			const payload = {
				name: name || sessionUser.name,
				email: email || sessionUser.email
			}

			if (password) {
				// @ts-ignore
				payload.password = password
			}

			const options: QueryOptions = { new: true, runValidators: true }
			const doc: IUserDoc = await User.findByIdAndUpdate(sessionUser._id, payload, options)
			const user = doc.serialize()

			return res.json({ user })
		} catch (error) {
			console.error(error)
			return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
		}
	}
}

export default dbConnectHandler(handler)
