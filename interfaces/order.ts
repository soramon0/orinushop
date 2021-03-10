import { Document } from "mongoose"

import IOrderItem from "@/interfaces/orderItem"

type IOrder = {
	user: string
	orderItems: IOrderItem[],
	shippingAddress: {
		address: string,
		city: string,
		postalCode: string,
		country: string
	},
	paymentMethod: string,
	paymentResult: {
		id: string,
		status: string,
		update_time: string,
		email_address: string
	},
	texPrice: {
		type: number,
		required: true,
		default: 0.0
	},
	shippingPrice: {
		type: number,
		required: true,
		default: 0.0
	},
	totalPrice: {
		type: number,
		required: true,
		default: 0.0
	},
	isPaid: boolean,
	paidAt: string,
	isDelivered: boolean,
	deliveredAt: string,
	createdAt: string
	updateAt: string
}

export type IOrderDoc = IOrder & Document