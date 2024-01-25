import { Response } from "express";
import jwt from "jsonwebtoken";
import svgCaptcha from "svg-captcha";
import {createAdmin, delAdminById, getAdminById, getAdminCount, getAllAdmin, updateAdminById} from "../modal/Admin";
import * as Result from '../utils/result';
import {generateHash} from "../utils/tools";
import config from "../config";

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
    if (!questionParams || !questionParams.username) {
      return Result.error(res, '用户名不能为空！');
    }
    if (!questionParams.phone) {
      return Result.error(res, '手机号不能为空！');
    }
    if (!questionParams.password) {
      return Result.error(res, '密码不能为空！');
    }
    const passwordHash = await generateHash(questionParams.password)
    if (!passwordHash) {
      return Result.error(res, '创建失败！');
    }
    const params = {
      username: questionParams.username,
      phone: questionParams.phone,
      password: passwordHash,
      role_id: questionParams.role_id,
      status: questionParams.status === undefined ? 1 : questionParams.status,
      create_time: Number(Date.now() / 1000),
      update_time: Number(Date.now() / 1000),
    };
    const data = await createAdmin(params);
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
    const data = await delAdminById(req.body.id);
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
    if (!questionParams || !questionParams.username) {
      return Result.error(res, '用户名不能为空！');
    }
    if (!questionParams.phone) {
      return Result.error(res, '手机号不能为空！');
    }
    const params = {
      username: questionParams.username,
      phone: questionParams.phone,
      role_id: questionParams.role_id,
      status: questionParams.status === undefined ? 1 : questionParams.status,
      update_time: Number(Date.now() / 1000),
    };
    const data = await updateAdminById(questionParams.id, params);
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
    const data = await getAdminById(req.user.id);
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
    const results = await getAllAdmin(params);
    const totalLen = await getAdminCount(params)
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
 * 生成验证码
 * @param req
 * @param res
 */
export const code = async (req: any, res: any) => {
  try {
    const options = {
      width: 120,   // 设置 SVG 图像的宽度
      height: 40    // 设置 SVG 图像的高度
    };
    const captcha = svgCaptcha.create(options);
    // 将验证码文本存储在会话中
    req.session.captcha = captcha.text;
    // 将验证码图像转换为Base64格式
    const captchaBase64 = Buffer.from(captcha.data).toString('base64');
    // 创建 Data URI
    const dataUri = "data:image/svg+xml;base64," + captchaBase64;
    return Result.success(res, dataUri);
  } catch (err) {
    return Result.error(res, err as Error);
  }
}

/**
 * 登录
 * @param req
 * @param res
 */
export const login = (req: any, res: any) => {
  const token = jwt.sign({ ...req.user }, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  });
  res.cookie(config.jwt.token, token, {
    maxAge: 7 * 60 * 60 * 24 * 1000
  });
  const data = {
    token,
    user: req.user,
  };
  return Result.success(res, data);
}
