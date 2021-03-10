import { Document } from 'mongoose'

type IUser = {
	name: string
	email: string
	password: string
	isAdmin: boolean
	createdAt: string
	updateAt: string
}

export default IUser

export type IUserDoc = IUser & Document