import { ICreateProduct } from "@/utils/interfaces"

export function createProductValidator({
	                                       count,
	                                       price,
	                                       title,
                                       }: ICreateProduct) {
	switch (true) {
		case isNaN(price):
		case price < 0:
		case isNaN(count):
		case count < 0:
		case !title:
			return false
		default:
			return true
	}
}
