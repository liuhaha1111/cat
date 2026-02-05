import { Pool } from 'pg';
import config from './database.js';

// 创建数据库连接池
const pool = new Pool(config);

// 测试数据库连接
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Database connected successfully:', result.rows[0]);
  });
});

export default pool;