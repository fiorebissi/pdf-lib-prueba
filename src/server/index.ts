import next from 'next'
import cors from 'cors'
import express from 'express'
import config from './config'

const app = next({ dev: config.isDev })

const handle = app.getRequestHandler()

	app.prepare().then(() => {
		const server = express()

		server.use(cors({
			origin: true,
			credentials: true
		}))

		server.all('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(config.port, () => {
			console.info(`> Ready on ${config.host}:${config.port}}`)
		})
	})

