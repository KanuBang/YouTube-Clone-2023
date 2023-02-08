import express from "express";
import {getLogin, postLogin,getJoin, postJoin, logout} from "../controllers/userController";
import {home, search} from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", home)
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin)
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin)
//rootRouter.get("/logout", logout)
rootRouter.get("/search", search)

export default rootRouter;