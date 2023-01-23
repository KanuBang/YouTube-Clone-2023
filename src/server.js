import express from "express";
const PORT = 8081;
const app = express();

const handleHome =  (req, res, next) => {
    return res.send({msg: "home"})
}

const handleLogin = (req, res, next) => {
    return res.end("<h1>Login</h1>")
}

app.get("/", handleHome)
app.get("/login", handleLogin)

const handleListening = ( ) => {
    console.log("8081 is working")
}

app.listen(PORT, handleListening)

