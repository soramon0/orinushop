import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const DB_URI = process.env.DB_URI

if (!DB_URI) {
	throw new Error(
		'Please define the DB_URI environment variable inside .env.local'
	)
}

export default async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		return
	}

	await mongoose.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true
	})
}

export function dbConnectHandler(handler: any) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		await dbConnect()

		return handler(req, res)
	}
}
