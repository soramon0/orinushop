import IUser from "@/interfaces/user";
import bcrypt from 'bcryptjs'

const _users: IUser[] = [
	{
		_id: '1',
		name: 'Admin User',
		email: 'admin@admin.com',
		password: bcrypt.hashSync('password'),
		isAdmin: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		_id: '2',
		name: 'Sam Will',
		email: 'sam@user.com',
		password: bcrypt.hashSync('password'),
		isAdmin: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		_id: '3',
		name: 'Lisa ko',
		email: 'lisa@user.com',
		password: bcrypt.hashSync('password'),
		isAdmin: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
]

export default _users;