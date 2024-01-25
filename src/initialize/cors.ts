import {Express} from "express";

/**
 * 跨域cors
 */
export const corsHandle = (app: Express) => {
  app.use('*', function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //设置方法
    if (req.method === 'OPTIONS') {
      res.sendStatus(200); // 意思是，在正常请求之前，会发送一个验证，是否可以请求。
    } else {
      next();
    }
  });
}
