import { NextApiRequest, NextApiResponse } from "next";

import { dbConnectHandler } from "@/lib/db";
import User from "@/models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'POST') {
		const { name, email, password } = req.body

		const isUser = await User.findOne({ email })

		if (isUser) {
			return res.status(400).json({ message: 'User already exists.' })
		}

		const user = await User.create({ name, email, password })
		delete user['password']

		return res.json({ user })
	}
}

export default dbConnectHandler(handler)
