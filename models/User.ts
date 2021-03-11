import mongoose from 'mongoose'
import { IUserDoc } from '@/interfaces/user'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
}, {
	timestamps: true
})

export default mongoose.models.User || mongoose.model<IUserDoc>('User', UserSchema)