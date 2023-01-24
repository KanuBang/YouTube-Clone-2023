import express from "express";
import morgan from "morgan";
const PORT = 8081;
const app = express();
const logger = morgan("dev")

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home")
globalRouter.get("/", handleHome)

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit User")
userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("watch Videos")
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => {
    console.log(`${PORT} is listening`)
}
app.listen(PORT, handleListening)

