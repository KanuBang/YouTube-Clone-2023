import express from "express";
import {
    getEdit,
    postEdit, 
    logout, 
    remove, 
    see,
    startGithubLogin,
    finishGithubLogin,
    getChangePassword,
    postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(postEdit)
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get("/logout", protectorMiddleware,logout)
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/callback",publicOnlyMiddleware ,finishGithubLogin);
userRouter.get(":id", see)
export default userRouter;
