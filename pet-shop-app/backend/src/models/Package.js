import pool from '../config/db.js';

class Package {
  // 获取所有套餐
  static async getAll() {
    const query = 'SELECT * FROM packages';
    const result = await pool.query(query);
    return result.rows;
  }

  // 根据ID获取套餐
  static async getById(id) {
    const query = 'SELECT * FROM packages WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // 创建套餐
  static async create(name, price, duration) {
    const query = `
      INSERT INTO packages (name, price, duration)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [name, price, duration]);
    return result.rows[0];
  }

  // 更新套餐
  static async update(id, name, price, duration) {
    const query = `
      UPDATE packages
      SET name = $1, price = $2, duration = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [name, price, duration, id]);
    return result.rows[0];
  }

  // 删除套餐
  static async delete(id) {
    const query = 'DELETE FROM packages WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default Package;