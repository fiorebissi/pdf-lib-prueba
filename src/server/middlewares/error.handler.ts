import { IncomingMessage } from 'http'
import { NextApiResponse } from 'next'
import { response } from '../helpers/network'

const errorMiddleware = (err: any, req: IncomingMessage, res: NextApiResponse) => {
	response({ res, status: err.status, message: err.message, success: false })
}

export default errorMiddleware
