import { ResponseService } from '../../types'

interface GetPdf extends ResponseService {
	data?: string
}

export const getPdf = async (): Promise<GetPdf> => {
	try {
		const res = await fetch('/api/pdf', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data: GetPdf = await res.json()

		return data
	} catch (error) {
		return {
			success: false,
			message: error as string
		}
	}
}