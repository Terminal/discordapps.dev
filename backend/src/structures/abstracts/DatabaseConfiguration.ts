export default interface DatabaseConfiguration {
	db: string,
	user: string,
	password: string,
	options?: {
		host: string,
		dialect: string
	}
}