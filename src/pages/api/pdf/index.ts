import { NextApiResponse } from 'next'
import nc from 'next-connect'
import errorMiddleware from 'src/server/middlewares/error.handler'
import { NextApiRequestExtend } from 'types/global'
// import { postPdfListadoSchema } from 'src/server/middlewares/schemas/pdfListado.schema'
import tryExecuteServices from 'src/server/middlewares/api.handler'
import { processPdf } from 'src/server/services/pdf'

const handler = nc<NextApiRequestExtend, NextApiResponse>({ onError: errorMiddleware })

handler.get(
	tryExecuteServices(async () => {
		const listado = await processPdf()

		console.log({ listado })
		if (!listado) {
			return {
				success: false,
				message: 'Hubo un error al generar el listado'
			}
		} else {
			return {
				success: true,
				message: 'Listado generado con exito!',
				data: listado
			}
		}
	})
)

export default handler
