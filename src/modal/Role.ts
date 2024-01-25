import {dbQuery} from "../db/mysql";

/**
 * 通过id获取Role信息
 * @param id
 */
const getRoleById = async (id: number) => {
  const sql = 'select * from h_role where id = ?';
  const res: any[] = (await dbQuery(sql, id)) as any[];
  if (res.length) {
    return res[0];
  }
  return null;
};

/**
 * 通过id更新Role信息
 * @param id
 * @param params
 */
const updateRoleById = async (id: number, params: any) => {
  const sql = 'update h_role set ? where id =?';
  return await dbQuery(sql, [params, id]);
};

/**
 * 通过id删除Role信息
 * @param id
 */
const delRoleById = async (id: number) => {
  const sql = 'delete from h_role where id = ?';
  return await dbQuery(sql, id);
};

/**
 * 获取所有账户信息
 */
const getAllRole = async (params: any) => {
  let sql = 'select * from h_role';
  let content: any[] = [];
  if (params.username) {
    sql += ' where name like ?';
    content.push('%' + params.username + '%');
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
const getRoleCount = async (params: any) => {
  let sql = 'select * from h_role';
  let content: any[] = [];
  if (params.username) {
    sql += ' where username like ?';
    content.push('%' + params.username + '%');
  }
  sql = sql + ' order by create_time desc';
  const results = await dbQuery(sql, content) as any[];
  return results.length
};

/**
 * 获取所有账户信息
 */
const createRole = async (params: any) => {
  const sql = 'insert into h_role set ?';
  return await dbQuery(sql, params);
};

/**
 * 获取角色列表
 */
const getRoleList = async () => {
  const sql = 'select * from h_role';
  return await dbQuery(sql);
}

export { getRoleById, getAllRole, createRole, getRoleCount, updateRoleById, delRoleById, getRoleList};
