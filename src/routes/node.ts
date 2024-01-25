import express from 'express';
import {getMenuNode, getMenuNodeBySelf} from "../controller/node";

const router = express.Router();

router.get('/getMenuNode', getMenuNode);
router.get('/getMenuNodeBySelf', getMenuNodeBySelf);

export = {
  router,
  basePath: '/node',
};
