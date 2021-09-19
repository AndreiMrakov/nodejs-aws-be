CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.stock
	(
		product_id uuid PRIMARY KEY NOT NULL,
		count      INTEGER DEFAULT 0,
		FOREIGN KEY (product_id) REFERENCES public.product (id) ON DELETE CASCADE
	)
