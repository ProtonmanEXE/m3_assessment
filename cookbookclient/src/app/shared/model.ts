export interface RecipeHeader {
	id: string
	title: string
}

export interface Recipe extends RecipeHeader {
	image:string
  instruction:string
  ingredients:string
}

export interface ResponseMessage {
  message: string
}
