import { dbConnection } from '@/database/providers/postgres';
import { ProductsRepository } from '@/repositories/products';
import { ProductsService } from '@/services/products';
import { ICreateProduct } from '@/utils/interfaces';
import { createProductValidator } from '@/validators/createProductValidator';
import { APIGatewayProxyHandler } from 'aws-lambda'

let productsRepository: ProductsRepository
let productsService: ProductsService

export const create: APIGatewayProxyHandler = async (event) => {
	try {
		const createDto = JSON.parse(event.body) as ICreateProduct
		const isValid = createProductValidator(createDto)
		
		if(!isValid) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: `Incorrect input data`,
					name: 'NotFound',
					statusCode: 400,
				}),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}
		}
		
		if(!productsService) {
			await dbConnection.connect()
			
			productsRepository = new ProductsRepository(dbConnection.query)
			productsService = new ProductsService(productsRepository)
		}
		const createdProduct = await productsService.create(createDto)
		
		return {
			statusCode: 200,
			body: JSON.stringify(createdProduct),
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
