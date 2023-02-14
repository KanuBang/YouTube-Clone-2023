import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session, { Cookie } from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views")
app.use(express.urlencoded({extended: true}))

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        /*
        cookie: {
            maxAge: 20000,
        },
        */
        store: MongoStore.create({mongoUrl:process.env.DB_URL}),
      
    })
)

app.use(localsMiddleware)
app.use("/uploads", express.static("uploads"))
app.use("/assets", express.static("assets"))
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;


