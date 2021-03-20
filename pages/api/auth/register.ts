import { NextApiRequest, NextApiResponse } from "next";

import { dbConnectHandler } from "@/lib/db";
import User from "@/models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'POST') {
		try {
			const { name, email, password } = req.body

			const isUser = await User.findOne({ email })

			if (isUser) {
				return res.status(400).json({ message: 'User already exists.' })
			}

			const doc = await User.create({ name, email, password })
			const user = doc.serialize()

			return res.json({ user })
		} catch (error) {
			return res.status(500).json({ message: 'Registeration failed. Please try again later.' })
		}
	}
}

export default dbConnectHandler(handler)
