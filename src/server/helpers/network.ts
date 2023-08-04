import { NextApiResponse } from 'next'
import { ResponseService } from 'types'

interface IResponse extends ResponseService {
  res: NextApiResponse
  status: number
}

export const response = ({ res, message, success, data, status }: IResponse): void => {
	if (!success) {
		console.error('[response error]:', data || message)
	}
	res.status(status).json({ success, message, data })
}
