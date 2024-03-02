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

create TABLE product_proposals (
    id serial NOT NULL PRIMARY KEY,
    product_id serial NOT NULL,
    email_address text NOT NULL,
    name text NOT NULL,
    phone_number text NOT NULL,
    address_latitude numeric,
    address_longitude numeric,
    created_by text,
    created_at date,
    proposal_details jsonb NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id)
)