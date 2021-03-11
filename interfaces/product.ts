import { Document } from "mongoose";

import IReview from '@/interfaces/review'

export type IProduct = {
	_id: string
	name: string
	image: string
	description: string
	brand: string
	category: string
	price: number
	countInStock: number
	rating: number
	numReviews: number
	reviews: IReview[]
	user: string
	createdAt: string
	updatedAt: string
}

export default IProduct

export type IProductDoc = IProduct & Document & {
	serialize(): IProduct
}
