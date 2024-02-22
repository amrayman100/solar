create TABLE products (
    id serial NOT NULL PRIMARY KEY,
    currency text NOT NULL,
    is_enabled boolean NOT NULL,
    created_by text,
    created_at date,
    updated_by text,
    updated_at date,
    parameters jsonb NOT NULL
)