import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const { DB_URI } = process.env

if (!DB_URI) {
	throw new Error(
		'Please define the DB_URI environment variable inside .env.local'
	)
}

function dbConnect(handler: any) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (mongoose.connection.readyState >= 1) {
			return handler(req, res)
		}

		await mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true
		})

		return handler(req, res)
	}
}

export default dbConnect

