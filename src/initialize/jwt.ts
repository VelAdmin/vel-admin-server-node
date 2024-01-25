import {expressjwt} from "express-jwt";
import config from "../config";
import jwt from "jsonwebtoken";
import {Express} from "express";

export const initJwt = (app: Express) => {
  // 权限校验
  app.use(
    expressjwt({
      secret: config.jwt.secret as string,
      algorithms: ['HS256'],
      getToken: function fromCookies(req) {
        return req.cookies[config.jwt.token as string];
      },
    }).unless({ path: config.route.whiteList }),
    (req, res, next) => {
      if (!req.user && req.cookies[config.jwt.token as string]) {
        req.user = jwt.verify(req.cookies[config.jwt.token as string], config.jwt.secret as string);
      }
      next();
    }
  );
}
