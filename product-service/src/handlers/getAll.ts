import films from './mock.json'
import { APIGatewayProxyHandler } from 'aws-lambda'

export const getAll: APIGatewayProxyHandler = async () => {
	return {
		statusCode: 200,
		body: JSON.stringify(films),
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	}
}
