CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.product
	(
		id          uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
		title       TEXT             NOT NULL,
		description TEXT,
		price       INTEGER
	)
