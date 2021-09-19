import { dbConnection } from '@/database/providers/postgres';
import { ProductsRepository } from '@/repositories/products';
import { ProductsService } from '@/services/products';
import { APIGatewayProxyHandler } from 'aws-lambda'

let productsRepository: ProductsRepository
let productsService: ProductsService

export const getAll: APIGatewayProxyHandler = async () => {
	try {
		if(!productsRepository) {
			await dbConnection.connect()
			
			productsRepository = new ProductsRepository(dbConnection.query)
			productsService = new ProductsService(productsRepository)
		}
		const products = await productsService.getAll()
		
		return {
			statusCode: 200,
			body: JSON.stringify(products),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		}
	} catch(e) {
		console.error(e)
		
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: e.message,
			}),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}
	} finally {
		await dbConnection.close()
	}
}
