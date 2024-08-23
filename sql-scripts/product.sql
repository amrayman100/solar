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
    email_address text,
    name text NOT NULL,
    phone_number text NOT NULL,
    address_latitude numeric,
    address_longitude numeric,
    created_by text,
    created_at date,
    is_interested boolean,
    proposal_details jsonb NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id)
)

create TABLE contact (
    id serial NOT NULL PRIMARY KEY,
    created_by text,
    created_at date,
    updated_by text,
    updated_at date,
    email_address text,
    name text NOT NULL,
    phone_number text NOT NULL
)


create TABLE brand_ambassador (
    id serial NOT NULL PRIMARY KEY,
    created_by text,
    created_at date,
    updated_by text,
    updated_at date,
    email_address text,
    name text NOT NULL,
    phone_number text NOT NULL
)