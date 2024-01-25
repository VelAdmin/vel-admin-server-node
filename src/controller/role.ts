import { Response } from "express";
import * as Result from '../utils/result';
import {
  createRole,
  delRoleById,
  getAllRole,
  getRoleById,
  getRoleCount,
  getRoleList,
  updateRoleById
} from "../modal/Role";
import {getNodeList} from "../modal/Node";
import {generateTree} from "../utils/tools";

/**
 * 添加
 * @param req
 * @param res
 */
export const add = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    // 接收表单数据
    const questionParams: any = req.body;
    // 判断数据是否合法
    if (!questionParams || !questionParams.name) {
      return Result.error(res, '角色名不能为空！');
    }
    const params = {
      name: questionParams.name,
      node: questionParams.node,
      status: questionParams.status === undefined ? 1 : questionParams.status,
      create_time: Number(Date.now() / 1000),
      update_time: Number(Date.now() / 1000),
    };
    const data = await createRole(params);
    return Result.success(res, data);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}

/**
 * 删除
 * @param req
 * @param res
 */
export const del = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    const data = await delRoleById(req.body.id);
    return Result.success(res, data);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}

/**
 * 更新
 * @param req
 * @param res
 */
export const update = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    // 接收表单数据
    const questionParams: any = req.body;
    // 判断数据是否合法
    if (!questionParams || !questionParams.name) {
      return Result.error(res, '角色名不能为空！');
    }
    const params = {
      name: questionParams.name,
      node: questionParams.node,
      status: questionParams.status === undefined ? 1 : questionParams.status,
      update_time: Number(Date.now() / 1000),
    };
    const data = await updateRoleById(questionParams.id, params);
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
export const get = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    const data = await getRoleById(req.user.id);
    if (data) {
      delete data.password;
    }
    return Result.success(res, data);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}

/**
 * 获取列表
 * @param req
 * @param res
 */
export const list = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    const params = req.query;
    if (!params.page) {
      params.page = 1;
    }
    if (!params.pageSize) {
      params.pageSize = 10;
    }
    const results = await getAllRole(params);
    const totalLen = await getRoleCount(params)
    results.forEach(item => delete item.password)
    const data = {
      page: params.page,
      pageSize: params.pageSize,
      list: results,
      total: totalLen,
    };
    return Result.success(res, data);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}

/**
 * 获取全部角色列表
 * @param req
 * @param res
 */
export const allList = async (req: any, res: Response<any, Record<string, any>>) => {
  try {
    const nodeList: any = await getRoleList();
    const data = nodeList.map((i:any) => {
      return {
        value: i.id,
        label: i.name
      }
    })
    return Result.success(res, data);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}
