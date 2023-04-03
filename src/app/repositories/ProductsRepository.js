const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: '123',
  port: 5432,
});

client.connect();

class ProductsRepository {
  async findAll() {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  }

  async findById(id) {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  async delete(id) {
    await client.query('DELETE FROM products WHERE id = $1', [id]);
  }

  async create({ name, price, subcategory }) {
    const result = await client.query(
      'INSERT INTO products (name, price, subcategory) VALUES ($1, $2, $3) RETURNING *',
      [name, price, subcategory]
    );
    return result.rows[0];
  }

  async update(id, { name, price, subcategory }) {
    const result = await client.query(
      'UPDATE products SET name = $1, price = $2, subcategory = $3 WHERE id = $4 RETURNING *',
      [name, price, subcategory, id]
    );
    return result.rows[0];
  }
}

module.exports = new ProductsRepository();
