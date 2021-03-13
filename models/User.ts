import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { IUserDoc } from '@/interfaces/user'

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function (next) {
	const user = this as IUserDoc

	if (!user.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
})

userSchema.methods.serialize = function () {
	const user = this.toObject() as IUserDoc
	user._id = user._id.toString();
	user.createdAt = user.createdAt.toString();
	user.updatedAt = user.updatedAt.toString();

	// @ts-ignore
	delete user.password

	return user;
}

userSchema.methods.checkPassword = async function (password: string) {
	const user = this as IUserDoc
	await bcrypt.compare(password, user.password)
}

export default mongoose.models.User || mongoose.model<IUserDoc>('User', userSchema)