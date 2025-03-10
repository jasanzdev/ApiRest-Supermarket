-- Create table user
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- Create table session
CREATE TABLE IF NOT EXISTS session (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL ON DELETE CASCADE,
    user_agent TEXT NOT NULL,
    UNIQUE (user_id, user_agent),
    FOREIGN KEY (user_id) REFERENCES "users" (id)
);