import express from "express";
import {
    getEdit,
    postEdit, 
    logout, 
    remove, 
    see,
    startGithubLogin,
    finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(postEdit)
//userRouter.get("/remove", remove)
userRouter.get("/logout", protectorMiddleware,logout)
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/callback",publicOnlyMiddleware ,finishGithubLogin);
userRouter.get(":id", see)
export default userRouter;
