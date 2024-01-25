import express from "express";
import {add, del, update, list, allList} from "../controller/role";
import {get} from "lodash";

const router = express.Router();

router.post('/add', add);
router.post('/del', del);
router.post('/update', update);
router.get('/list', list);
router.get('/get', get);
router.get('/all', allList);


export = { router, basePath: '/role' };
