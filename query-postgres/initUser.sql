CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--Create database supermarket_users
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'supermarket_users') THEN
        CREATE DATABASE supermarket_users;
    END IF;
END $$;

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