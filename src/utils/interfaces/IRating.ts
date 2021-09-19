import { MovieType } from '@/utils/enums';

export interface IRating {
	id: string
	title: string
	year: number
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
