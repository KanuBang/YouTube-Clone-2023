import express from "express";
import { deleteVideo, upload,see,edit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit );
videoRouter.get("/id(\\d+)/delete",deleteVideo);


export default videoRouter;

