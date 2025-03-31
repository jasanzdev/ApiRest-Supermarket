CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--Create database supermarket_products
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'supermarket_products') THEN
        CREATE DATABASE supermarket_products;
    END IF;
END $$;

-- Create table product
CREATE TABLE IF NOT EXISTS product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR NOT NULL,
    price_purchase DECIMAL(8,2) NOT NULL,
    price_sale DECIMAL(8,2) NOT NULL,
    stock INTEGER NOT NULL,
    threshold INTEGER,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    thumbnail TEXT,
    code BIGINT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);