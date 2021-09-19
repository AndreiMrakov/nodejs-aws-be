import { ClientBase } from 'pg';

export class StocksRepository {
	private readonly _tableName: 'stock';
	
	constructor(private readonly _query: ClientBase['query']) {}
	
	get() {
		return this._query(
			`select * from $1`,
			[this._tableName],
		)
	}
	
	getByID(id: string) {
		return this._query(
			`select * from $1 where id=$2`,
			[this._tableName, id],
		)
	}
	
	getProductID(id: string) {
		return this._query(
			`select * from $1 where product_id=$2`,
			[this._tableName, id],
		)
	}
}
