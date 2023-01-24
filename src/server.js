import express from "express";
import morgan from "morgan";
const PORT = 8081;
const app = express();


const logger = morgan("dev")
const handleHome = (req, res, next) => {
    console.log("response")
    return res.end("<h1>Login</h1>")
}

app.use(logger)
app.get("/", handleHome)



const handleListening = ( ) => {
    console.log("8081 is working")
}

app.listen(PORT, handleListening)

