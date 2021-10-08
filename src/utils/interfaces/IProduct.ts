import { MovieType } from '../enums';
import { IRating } from './IRating';

export interface IProduct {
	id: string
	title: string
	description?: string
	year?: number
	adult?: boolean
	release?: string
	genre?: string
	director?: string
	writer?: string
	actors?: string[]
	language?: string
	country?: string
	poster?: string
	ratings?: IRating[]
	type?: MovieType
	production?: string
}

export interface ICreateProduct {
	title: string
	price: number
	description: string
	count: number
}
