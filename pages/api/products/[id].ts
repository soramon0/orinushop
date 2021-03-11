import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";

import { dbConnectHandler } from "@/lib/db";
import Product from "@/models/Product";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		const { id } = req.query

		if (!id || !isValidObjectId(id)) {
			return res.status(400).json({ message: 'id is not valid.' })
		}

		const product = await Product.findById(id)

		if (!product) {
			return res.status(404).json({ message: 'product not found.' })
		}

		return res.json({ product })
	}
}

export default dbConnectHandler(handler)
