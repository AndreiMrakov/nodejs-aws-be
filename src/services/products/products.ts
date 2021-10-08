import { ProductsRepository } from '@/repositories/products';
import { ICreateProduct } from '@/utils/interfaces';

export class ProductsService {
	constructor(private readonly productRepository: ProductsRepository) {
	}
	
	getAll() {
		return this.productRepository.get()
	}
	
	getByID(id: string) {
		return this.productRepository.getByID(id)
	}
	
	create(dto: ICreateProduct) {
		return this.productRepository.create(dto)
	}
}
