import * as path from 'path';
import * as fs from 'fs';
import {Express} from "express";

/**
 * 初始化路由
 * @param app
 */
export const initRoutes = (app: Express) => {
  registerRoutes(app)
  emptyRouteHandle(app)
  exceptionHandle(app)
}


/**
 * 注册路由
 * @param app
 */
const registerRoutes = (app: Express) => {
  fs.readdirSync(path.resolve(__dirname, '../routes'))
    .filter((file) => !file.endsWith('.map'))
    .forEach((file) => {
      const router = require(`../routes/${file}`);
      app.use(router.basePath, router.router);
    });
}
/**
 * 空路由处理
 * @param app
 */
const emptyRouteHandle = (app: Express) => {
  app.use('*', (_req, res) => {
    res.json({
      code: -1,
      msg: 'url不存在',
    });
  });
}

/**
 * 异常处理
 * @param app
 */
const exceptionHandle = (app: Express) => {
  app.use((err: any, _req: any, res: any, _next: any) => {
    if (err) {
      console.log(err,4444)
      const status = err.status || 500;
      res.status(status).json({
        code: -1,
        msg: err.message || '系统未知异常，请联系管理页',
      });
    }
  });
}
