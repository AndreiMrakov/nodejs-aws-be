import { Client, ClientConfig } from 'pg'

export class DbConnection {
	private readonly _client: Client;
	private readonly _query: Client['query'];
	
	constructor(config: ClientConfig) {
		this._client = new Client(config);
		this._query = this._client.query
	}
	
	async connect() {
		try {
			await this._client.connect()
			
			return this
		} catch(e) {
			await this._client.end()
			console.error(e)
		}
	}
	
	get client() {
		return this._client
	}
	
	get query() {
		return this._query.bind(this._client)
	}
	
	close() {
		return this._client.end()
	}
}

export const dbConnection = new DbConnection({
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	database: process.env.PG_DATABASE,
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
})
