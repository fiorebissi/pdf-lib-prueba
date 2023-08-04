import 'dotenv/config'

const env = process.env.NODE_ENV || 'development'

const port = process.env.PORT || 3000
const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost'
const isDev = env === 'development'


const config = {
	port,
	host,
	isDev
}

export default config
