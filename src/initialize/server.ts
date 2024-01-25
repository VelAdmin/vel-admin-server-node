import {Express} from "express";
import logger from "./logger";
import config from "../config";

const getMessage = (port: number) => `
################################################
服务启动成功！地址: http://127.0.0.1:${port}
################################################`

export const appRun = (app: Express) => {
  // 启动服务
  const port = config.port as number;
  app.listen(port, () => {
    logger.info(getMessage(port));
  });
}

