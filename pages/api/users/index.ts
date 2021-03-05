import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/db";
import User from "models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		const users = await User.find()

		return res.json({ users })
	}
}

export default dbConnect(handler)