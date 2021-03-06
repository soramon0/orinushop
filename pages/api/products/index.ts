import { NextApiRequest, NextApiResponse } from "next";

import products from '@/data/products'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		return res.json({ products })
	}
}

export default handler
