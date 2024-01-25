import bcrypt from "bcrypt";

/**
 * 生成hash
 * @param text
 */
export const generateHash = (text: string) => {
  return new Promise((resolve, reject) => {
    // 生成密码哈希
    bcrypt.hash(text, 10, (err, hash) => {
      if (err) {
        // 处理错误
        reject(null)
      } else {
        // 在这里保存或更新数据库中的用户记录，并将哈希存储为密码
        resolve(hash)
      }
    });
  })
}

/**
 * 转化为树状结构
 * @param data
 */
export const generateTree = (data: any) => {
  // 取出根节点
  const rootList = data.filter((i: any) => i.pid === 0)
  // 补充根节点的子节点
  return rootList.map((i: any) => {
    const children = data.filter((j: any) => j.pid === i.id)
    return {
      value: i.id,
      label: i.name,
      children: children.map((j:any) => {
        return {
          value: j.id,
          label: j.name,
        }
      })
    }
  })
}
