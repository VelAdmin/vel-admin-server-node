import mysql from 'mysql'
import config from "../config";

/**
 * 数据库实例
 */
export const db = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

/**
 * await形式调用
 * @param sql
 * @param values
 */
export const dbQuery = (sql: any, values: any = null) => {
  return new Promise((resolve, reject) => {
    if (values) {
      db.query(sql, values, (err: any, rows: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } else {
      db.query(sql, (err: any, rows: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  });
}
