import type { NextApiRequest } from 'next'

export interface NextApiRequestExtend extends NextApiRequest {
  params: any,
  file: any,
	files: any
}