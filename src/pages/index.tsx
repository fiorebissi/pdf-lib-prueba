import { getPdf } from '@utils/services'
import React, { useState } from 'react'

const Index = () => {
	const [state, setState] = useState({
		loading: false,
		error: ''
	})
	const handleClick = async () => {
		const res = await getPdf()

		if (!res.success) {
			setState({
				loading: false,
				error: res.message
			})
		} else {
			setState({
				loading: false,
				error: ''
			})

			const base64String = res?.data

			// console.log('base64String', base64String)

			fetch(base64String as string)
				.then(res => res.blob())
				.then(res => {
					const url = URL.createObjectURL(res as Blob)
					const link = document.createElement('a')

					link.href = url
					link.download = 'PdfPrueba.pdf'
					link.click()
				})
		}
	}
	return (
		<div>
			{state.loading ? (
				<div>...Loading Pdf</div>
			) : (
					<button type='button' onClick={handleClick}>Process Pdf</button>
			)}
			{state.error && (
				<div>
					<h1>Hubo un error</h1>
					<p>{state.error}</p>
					</div>
			)}
		</div>
	)
}

export default Index