import passport from "passport";
import bcrypt from "bcrypt";
import {getAdminByPhone} from "../modal/Admin";

const LocalStrategy = require('passport-local').Strategy;

/**
 * 配置Passport策略
 */
export const passportStrategy = () => {
  const options = {
    usernameField: 'phone', // 使用 'phone' 字段作为用户名字段
    passwordField: 'password', // 使用 'password' 字段作为密码字段
  }
  passport.use(
    new LocalStrategy(options, async function (phone: number, password: string | Buffer, done: any) {
      const res = await getAdminByPhone(phone);
      if (res) {
        const passwordMatch = await bcrypt.compare(password, res.password);
        if (passwordMatch) {
          delete res.password;
          return done(null, res);
        }
      }
      return done({ message: '账号或密码不正确' });
    })
  );
}
