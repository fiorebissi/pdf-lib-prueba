export interface HasReqError {
  data: number | string | boolean | undefined
  desc: string
  nameProperty: string
  type: 'number' | 'string' | 'boolean'
}

export interface ResponseService {
  success: boolean;
  message: string;
  data?: any;
}