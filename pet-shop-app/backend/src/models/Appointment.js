import pool from '../config/db.js';

class Appointment {
  // 获取所有预约
  static async getAll() {
    const query = 'SELECT * FROM appointments';
    const result = await pool.query(query);
    return result.rows;
  }

  // 根据ID获取预约
  static async getById(id) {
    const query = 'SELECT * FROM appointments WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // 根据日期获取预约
  static async getByDate(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = `
      SELECT * FROM appointments
      WHERE start_time >= $1 AND end_time <= $2
    `;
    const result = await pool.query(query, [startOfDay, endOfDay]);
    return result.rows;
  }

  // 检查时间冲突
  static async checkTimeConflict(startTime, endTime, excludeId = null) {
    const query = `
      SELECT * FROM appointments
      WHERE (
        (start_time < $2 AND end_time > $1)
      )
      ${excludeId ? 'AND id != $3' : ''}
    `;
    const params = excludeId ? [startTime, endTime, excludeId] : [startTime, endTime];
    const result = await pool.query(query, params);
    return result.rows.length > 0;
  }

  // 创建预约
  static async create(packageId, petName, startTime, endTime, notes = '') {
    // 检查时间冲突
    const hasConflict = await this.checkTimeConflict(startTime, endTime);
    if (hasConflict) {
      throw new Error('时间冲突，该时间段已被占用');
    }

    const query = `
      INSERT INTO appointments (package_id, pet_name, start_time, end_time, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [packageId, petName, startTime, endTime, notes]);
    return result.rows[0];
  }

  // 更新预约
  static async update(id, packageId, petName, startTime, endTime, notes = '') {
    // 检查时间冲突（排除当前预约）
    const hasConflict = await this.checkTimeConflict(startTime, endTime, id);
    if (hasConflict) {
      throw new Error('时间冲突，该时间段已被占用');
    }

    const query = `
      UPDATE appointments
      SET package_id = $1, pet_name = $2, start_time = $3, end_time = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const result = await pool.query(query, [packageId, petName, startTime, endTime, notes, id]);
    return result.rows[0];
  }

  // 删除预约
  static async delete(id) {
    const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default Appointment;