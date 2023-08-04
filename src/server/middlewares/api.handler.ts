import createHttpError from 'http-errors'
import { NextApiResponse } from 'next'
import { response } from '../helpers/network'
import { NextApiRequestExtend } from 'types/global'

interface ServicesProps {
	req: NextApiRequestExtend
	res: NextApiResponse
}

interface ServicesReturn {
	data?: any
	message: string
}

const tryExecuteServices = (services: (props: ServicesProps) => Promise<ServicesReturn>) => {
	return async (req: NextApiRequestExtend, res: NextApiResponse) => {
		try {
			const { data, message } = await services({ req, res })

			return response({ res, message: message, data, success: true, status: 200 })
		} catch (error) {
			if (createHttpError.isHttpError(error)) {
				return response({ res, message: error.message, success: false, status: error.statusCode })
			}
			console.error(error)
			return response({ res, message: 'Server error', success: false, status: 500 })
		}
	}
}

export default tryExecuteServices
