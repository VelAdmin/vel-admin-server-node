import express, {Express} from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import config from "../config";

/**
 * 初始化配置
 */
export const initConfig = (app: Express) => {
  app.use(express.json({limit: '5mb'}));
  app.use(express.urlencoded({limit: '5mb', extended: true}));
  app.use(cookieParser());

  // 配置会话中间件
  app.use(session({
    secret: config.jwt.secret as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  }));
}
