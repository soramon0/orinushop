import User from '../models/User';
import Product from '../models/Product';
import Order from '@/models/Order';
import dbConnect from '@/lib/db';
import _users from '@/data/users';
import _products from '@/data/products';


export async function importData() {
	try {
		await dbConnect()
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		const users = await User.insertMany(_users.map(({ _id, ...u }) => u))

		const admin = users[0]._id
		const products: any[] = _products.map(({ _id, ...p }) => ({ ...p, user: admin }))
		await Product.insertMany(products)

		console.log('Data imported')
	} catch (err) {
		console.error(err);
		process.exit(1)
	}
}

export async function dropData() {
	try {
		await dbConnect()
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data dropt')
		process.exit()
	} catch (err) {
		console.error(err);
		process.exit(1)
	}
}