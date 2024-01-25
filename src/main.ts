import express from 'express'
import {initConfig} from "./initialize/config";
import {appRun} from "./initialize/server";
import {initRoutes} from "./initialize/router";
import {corsHandle} from "./initialize/cors";
import {passportStrategy} from "./middlewares/jwtMiddleware";
import {initJwt} from "./initialize/jwt";


const app = express();

// 初始化配置
initConfig(app)

// 跨域
corsHandle(app)

// 配置Passport策略
passportStrategy()

// 初始化JWT，需要在初始化路由之前
initJwt(app)

// 初始化路由
initRoutes(app)

// 启动服务
appRun(app)
