import IUser from "@/interfaces/user";
import bcrypt from 'bcryptjs'

const _users: IUser[] = [
	{
		name: 'Admin User',
		email: 'admin@admin.com',
		password: bcrypt.hashSync('password'),
		isAdmin: true,
		createdAt: new Date().toISOString(),
		updateAt: new Date().toISOString()
	},
	{
		name: 'Sam Will',
		email: 'sam@user.com',
		password: bcrypt.hashSync('password'),
		isAdmin: false,
		createdAt: new Date().toISOString(),
		updateAt: new Date().toISOString()
	},
	{
		name: 'Lisa ko',
		email: 'lisa@user.com',
		password: bcrypt.hashSync('password'),
		isAdmin: false,
		createdAt: new Date().toISOString(),
		updateAt: new Date().toISOString()
	},
]

export default _users;