// 数据库配置文件
export default {
  host: 'ep-wandering-bush-ahy1y5hc-pooler.c-3.us-east-1.aws.neon.tech',
  port: 5432,
  user: 'neondb_owner',
  password: 'npg_3EoiqvcCTuF5',
  database: 'neondb',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  ssl: {
    rejectUnauthorized: false
  }
};
