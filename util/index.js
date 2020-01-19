const mysqlConfig = {
	// host: '172.16.196.145',
	host: '47.111.236.172',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'test'
}

const redisConfig = {
	port: 6379,
	// host: '172.16.196.145',
	host: '47.111.236.172',
	family: 4,
	password: "root",
	db: 0
}

module.exports = {
	mysqlConfig,
	redisConfig
}