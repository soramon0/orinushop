import mongoose from 'mongoose'
import IUser from '@/interfaces/user'

const UserSchema = new mongoose.Schema({
	name: {
		type: String
	}
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)