import films from './mock.json'
import { APIGatewayProxyHandler } from 'aws-lambda'

export const getByID: APIGatewayProxyHandler = async (event) => {
	const { id } = event.pathParameters
	const founded = films.find(({ id: filmID }) => filmID === id)
	
	if(!founded) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				message: `Film with id '${ id }' was NOT FOUND.`,
				name: 'NotFound',
				statusCode: 404,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	}
	
	return {
		statusCode: 200,
		body: JSON.stringify(founded),
	}
}
