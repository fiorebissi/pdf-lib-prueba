import fs from 'fs'
import { PDFDocument } from 'pdf-lib'

export const processPdf = async () => {
	try {
		// const pdfDoc = await PDFDocument.create()

		const pdfPath = './public/205bff32-f108-48f7-b885-61e6535d6da5_original.pdf'
		// const pdfPath = './public/documents/205bff32-f108-48f7-b885-61e6535d6da5.pdf'
		const pdfV2 = await PDFDocument.load(fs.readFileSync(`${pdfPath}`))
		const pages = pdfV2.getPages()
		const widthPage = pages[0].getWidth()
		const heightPage = pages[0].getHeight()
		// const pages = pdfDoc.getPages()
		const cantPag = pdfV2.getPageCount()
		// const numeroFactura = '0011-00017144'

		// console.log('cantPag', cantPag)

		// // HEROKU PATH
		const pngPath = 'https://consejo-profesional.herokuapp.com/STICKER_CONSEJO.png'
		const pngImageBytes = await fetch(pngPath).then((res) => res.arrayBuffer())

		const Sticker = await pdfV2.embedPng(pngImageBytes)

		const pngDims = Sticker.scale(0.25)

		console.log('cuantas paginas tiene?', cantPag)
		console.log('cual es el ancho de la pag', widthPage)
		console.log('cual es el alto de la pag', heightPage)

		pages[0].drawImage(Sticker, {
			x: 5,
			y: 645.1, // 645
			width: pngDims.width,
			height: pngDims.height
		})

		const pdfDataUri = await pdfV2.saveAsBase64({ dataUri: true })

		return pdfDataUri

	} catch (error) {
		return error
	}
}