BEGIN;
WITH
	product_ids AS
		(
			INSERT INTO public.product
				(
				 title,
				 price,
				 description
					)
					VALUES
						(
							'Harry potter 1',
							1000,
							'Harry Potter AND the Philosopher"s Stone'
						),
						(
							'Harry potter 2',
							2000,
							'Harry Potter and the Chamber of Secrets'
						),
						(
							'Harry potter 3',
							3000,
							'Harry Potter and the Prisoner of Azkaban'
						),
						(
							'Harry potter 4',
							4000,
							'Harry Potter and the Goblet of Fire'
						),
						(
							'Harry potter 5',
							5000,
							'Harry Potter and the Order of the Phoenix'
						),
						(
							'Harry potter 6',
							6000,
							'Harry Potter and the Half-Blood Prince'
						),
						(
							'Harry potter 7/1',
							7000,
							'Harry Potter and the Deathly Hallows: Part 1'
						),
						(
							'Harry potter 7/2',
							7500,
							'Harry Potter and the Deathly Hallows: Part 2 '
						)
				RETURNING product.id
		)
INSERT
	INTO public.stock
		(
			product_id,
			count
		)
		(
			SELECT
				id,
				ROW_NUMBER() OVER () * 10
				FROM
					product_ids
		);
COMMIT;
