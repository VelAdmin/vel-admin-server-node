import express from "express";
import passport from "passport";
import {add, del, update, get, list, code, login} from "../controller/admin";
import {validateCaptcha} from "../middlewares/captchaMiddleware";

const router = express.Router();

router.post('/add', add);
router.post('/del', del);
router.post('/update', update);
router.get('/get', get);
router.get('/code', code);
router.get('/list', list);

router.post(
  '/login',
  validateCaptcha,
  passport.authenticate('local', {
    session: false,
    assignProperty: 'user',
    failWithError: true,
  }),
  login
);

export = { router, basePath: '/admin' };
