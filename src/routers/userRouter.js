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

const userRouter = express.Router();

userRouter.route('/edit').get(getEdit).post(postEdit)
//userRouter.get("/remove", remove)
userRouter.get("/logout", logout)
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callback", finishGithubLogin);
userRouter.get(":id", see)
export default userRouter;
