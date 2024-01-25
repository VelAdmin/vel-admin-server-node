import * as Result from "../utils/result";

/**
 * 自定义中间件来验证验证码
 * @param req
 * @param res
 * @param next
 */
export const validateCaptcha = (req: any, res: any, next: any) => {
  const expectedCaptcha = req.session.captcha;
  const userCaptcha = req.body.code;
  if (expectedCaptcha !== userCaptcha) {
    Result.error(res, '验证码错误');
    return
  }
  // 验证通过，继续下一个中间件
  next();
}
