import { Response } from "express";
import * as Result from '../utils/result';
import {getNodeList} from "../modal/Node";
import {generateTree} from "../utils/tools";
import {getRoleById} from "../modal/Role";

/**
 * 获取
 * @param req
 * @param res
 */
export const getMenuNode = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    const nodeList = await getNodeList(false);
    const data = generateTree(nodeList)
    return Result.success(res, data);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}

/**
 * 获取
 * @param req
 * @param res
 */
export const getMenuNodeBySelf = async (req: any, res: any) => {
  try {
    const nodeList = await getNodeList(false);
    const role = await getRoleById(req.user.role_id);
    if (role.node === '#') {
      return Result.success(res, role.node);
    }
    const curNodeList = role.node.split(',').map((i: any) => {
      const findOne = nodeList.find((j: any) => j.id === Number(i))
      return findOne ? findOne.key : ''
    })
    return Result.success(res, curNodeList);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}
