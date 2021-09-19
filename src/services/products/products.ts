import { ProductsRepository } from '@/repositories/products';

export class ProductsService {
	constructor(private readonly productRepository: ProductsRepository) {
	}
	
	getAll() {
		return this.productRepository.get()
	}
	
	getByID(id: string) {
		return this.productRepository.getByID(id)
	}
}
