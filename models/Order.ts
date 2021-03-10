import mongoose from 'mongoose'
import { IOrderDoc } from '@/interfaces/order'

const orderItem = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	qty: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Product'
	},
}, {
	timestamps: true
})

const OrderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	orderItems: [orderItem],
	shippingAddress: {
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		postalCode: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		}
	},
	paymentMethod: {
		type: String,
		required: true
	},
	paymentResult: {
		id: String,
		status: String,
		update_time: String,
		email_address: String
	},
	texPrice: {
		type: Number,
		required: true,
		default: 0.0
	},
	shippingPrice: {
		type: Number,
		required: true,
		default: 0.0
	},
	totalPrice: {
		type: Number,
		required: true,
		default: 0.0
	},
	isPaid: {
		type: Boolean,
		required: true,
		default: false
	},
	paidAt: Date,
	isDelivered: {
		type: Boolean,
		required: true,
		default: false
	},
	deliveredAt: Date
}, {
	timestamps: true
})

export default mongoose.models.Order || mongoose.model<IOrderDoc>('Order', OrderSchema)