import {dbQuery} from "../db/mysql";


/**
 * 通过id获取Admin信息
 * @param id
 */
const getAdminById = async (id: number) => {
  const sql = 'select * from h_admin where id = ?';
  const res: any[] = (await dbQuery(sql, id)) as any[];
  if (res.length) {
    return res[0];
  }
  return null;
};

/**
 * 通过Phone获取Admin信息
 * @param phone
 */
const getAdminByPhone = async (phone: number) => {
  const sql = 'select * from h_admin where phone = ?';
  const res: any[] = (await dbQuery(sql, phone)) as any[];
  if (res.length) {
    return res[0];
  }
  return null;
};

/**
 * 通过id更新Admin信息
 * @param id
 * @param params
 */
const updateAdminById = async (id: number, params: any) => {
  const sql = 'update h_admin set ? where id =?';
  return await dbQuery(sql, [params, id]);
};

/**
 * 通过id删除Admin信息
 * @param id
 */
const delAdminById = async (id: number) => {
  const sql = 'delete from h_admin where id = ?';
  return await dbQuery(sql, id);
};

/**
 * 获取所有账户信息
 */
const getAllAdmin = async (params: any) => {
  let sql = 'select * from h_admin';
  let content: any[] = [];
  let isMore = false; // 是否有多个查询参
  if (params.username) {
    sql += ' where username like ?';
    content.push('%' + params.username + '%');
    isMore = true;
  }
  if (params.phone) {
    if (isMore) {
      sql += ' and phone like ?';
    } else {
      sql += ' where phone like ?';
    }
    content.push('%' + params.phone + '%');
  }
  sql = sql + ' order by create_time desc';
  if (params.page || params.pageSize) {
    let page = params.page; //当前页码
    let pageSize = params.pageSize; //一页展示多少条数据
    sql += ' limit ?,?';
    content.push((page - 1) * pageSize, parseInt(pageSize));
  }
  return await dbQuery(sql, content) as any[];
};

/**
 * 获取所有账户数量
 */
const getAdminCount = async (params: any) => {
  let sql = 'select * from h_admin';
  let content: any[] = [];
  let isMore = false; // 是否有多个查询参
  if (params.username) {
    sql += ' where username like ?';
    content.push('%' + params.username + '%');
    isMore = true;
  }
  if (params.phone) {
    if (isMore) {
      sql += ' and phone like ?';
    } else {
      sql += ' where phone like ?';
    }
    content.push('%' + params.phone + '%');
  }
  sql = sql + ' order by create_time desc';
  const results = await dbQuery(sql, content) as any[];
  return results.length
};

/**
 * 获取所有账户信息
 */
const createAdmin = async (params: any) => {
  const sql = 'insert into h_admin set ?';
  return await dbQuery(sql, params);
};

export { getAdminById, getAllAdmin, createAdmin, getAdminCount, updateAdminById, delAdminById, getAdminByPhone};
