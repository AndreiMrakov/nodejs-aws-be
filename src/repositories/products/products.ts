import { ICreateProduct, IProduct } from '@/utils/interfaces';
import { ClientBase } from 'pg';

export class ProductsRepository {
	private readonly _tableName: string;
	private readonly _stocksTableName: string;
	
	constructor(private readonly _query: ClientBase['query']) {
		this._tableName = 'product';
		this._stocksTableName = 'stock';
	}
	
	async get() {
		const { rows } = await this._query(
			`SELECT id, title, description, price, count
				 FROM ${ this._tableName } RIGHT JOIN ${ this._stocksTableName }
						 ON ${ this._tableName }.id = ${ this._stocksTableName }.product_id`,
		)
		
		return rows
	}
	
	async getByID(id: IProduct['id']) {
		const { rows } = await this._query(
			`SELECT id, title, description, price, count
				 FROM ${ this._tableName }
					 RIGHT JOIN ${ this._stocksTableName }
						 ON ${ this._tableName }.id = ${ this._stocksTableName }.product_id
				 WHERE
					 id = '${ id }'`,
		)
		
		return rows?.[0] || null
	}
	
	async create(dto: ICreateProduct) {
		// const { rows } = await this._query(
		// 	`
		// 		INSERT INTO ${ this._tableName }
		// 			(
		// 				title,
		// 				description,
		// 				price
		// 			)
		// 			VALUES
		// 				(
		// 					${ dto.title },
		// 					${ dto.description },
		// 					${ dto.price },
		// 				) returning id`,
		// )
		//
		// return rows[0]
	}
}
