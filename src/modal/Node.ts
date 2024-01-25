import {dbQuery} from "../db/mysql";


/**
 * 获取权限
 * @param isAll 是否获取全部权限
 */
const getNodeList = async (isAll = false) => {
  let sql = 'select * from h_node';
  if (!isAll) {
    sql = sql + ' where is_menu = 1';
  }
  return await dbQuery(sql) as any[]
};

export {getNodeList}
