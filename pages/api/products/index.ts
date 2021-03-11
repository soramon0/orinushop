import { NextApiRequest, NextApiResponse } from "next";

import Product from "@/models/Product";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		const products = await Product.find()
		return res.json({ products })
	}
}

export default handler
