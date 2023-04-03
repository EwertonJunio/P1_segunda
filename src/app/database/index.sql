CREATE DATABASE mydatabase;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  subcategory VARCHAR(255) NOT NULL
);
