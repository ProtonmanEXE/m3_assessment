export interface ReviewHeader {
	uuid: string
	title: string
}

export interface Review extends ReviewHeader {
	review:string
  name:string
  date:string
}

export interface ResponseMessage {
  message: string
}
