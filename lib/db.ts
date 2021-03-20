import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

import { getDbLink } from '@/utils/env'

const DB_URI = getDbLink()

export default async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		return
	}

	await mongoose.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
}

export function dbConnectHandler(handler: any) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		await dbConnect()

		return handler(req, res)
	}
}
