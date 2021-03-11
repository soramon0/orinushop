import mongoose from 'mongoose'
import { IProductDoc } from '@/interfaces/product'

const productSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	reviews: [{
		name: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
			required: true
		}
	}, {
		timestamps: true
	}],
	rating: {
		type: Number,
		required: true,
		default: 0
	},
	numReviews: {
		type: Number,
		required: true,
		default: 0
	},
	price: {
		type: Number,
		required: true,
		default: 0
	},
	countInStock: {
		type: Number,
		required: true,
		default: 0
	},
}, {
	timestamps: true
})

productSchema.methods.serialize = function () {
	const product = this.toObject() as IProductDoc
	product._id = product._id.toString();
	product.user = product.user?.toString();
	product.createdAt = product.createdAt.toString();
	product.updatedAt = product.updatedAt.toString();

	return product;
}

export default mongoose.models.Product || mongoose.model<IProductDoc>('Product', productSchema)
