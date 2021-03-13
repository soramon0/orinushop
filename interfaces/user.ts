import { Document } from 'mongoose'

type IUser = {
	_id: string
	name: string
	email: string
	isAdmin: boolean
	createdAt: string
	updatedAt: string
}

export default IUser

export type IUserDoc = IUser & Document & {
	password: string
	serialize(): IUser
	checkPassword(password: string): Promise<boolean>
}