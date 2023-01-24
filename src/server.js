import express from "express";
import morgan from "morgan";
import globalRouter from "../routers/globalRouter";
import videoRouter from "../routers/videoRouter";
import userRouter from "../routers/userRouter";

const PORT = 8081;
const app = express();
//const logger = morgan("dev")

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => {
    console.log(`${PORT} is listening`)
}
app.listen(PORT, handleListening)

