import IProduct from '@/interfaces/product';

export default interface IOrderItem {
	name: string
	qty: number
	image: string
	price: number
	product: IProduct
	createdAt: string
	updateAt: string
}