function checkEnv(env: string | undefined, name: string) {
	if (!env) {
		throw new Error(
			`Please define the ${name} environment variable inside .env.local`
		)
	}

	return env
}

export function getDbLink() {
	const DB_URI = process.env.DB_URI
	return checkEnv(DB_URI, 'DB_URI')
}

export function getSecret() {
	const SECRET = process.env.SECRET
	return checkEnv(SECRET, 'SECRET')
}