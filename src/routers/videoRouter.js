import express from "express";
import { 
    deleteVideo, 
    upload,
    watch,
    getEdit,
    postEdit 
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;

