import { dbConnection } from '@/database/providers/postgres';
import { ProductsRepository } from '@/repositories/products';
import { ProductsService } from '@/services/products';
import { APIGatewayProxyHandler } from 'aws-lambda'

let productsRepository: ProductsRepository
let productsService: ProductsService

export const getByID: APIGatewayProxyHandler = async (event) => {
	const { id } = event.pathParameters
	
	try {
		if(!productsService) {
			await dbConnection.connect()
			
			productsRepository = new ProductsRepository(dbConnection.query)
			productsService = new ProductsService(productsRepository)
		}
		const foundedProduct = await productsService.getByID(id)
		
		if(!foundedProduct) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: `Film with id '${ id }' was NOT FOUND.`,
					name: 'NotFound',
					statusCode: 404,
				}),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}
		}
		
		console.log('===> foundedProduct', foundedProduct)
		return {
			statusCode: 200,
			body: JSON.stringify(foundedProduct),
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
