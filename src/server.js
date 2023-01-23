import express from "express";
const PORT = 8081;
const app = express();

const handleHome =  (req, res, next) => {
    return res.end("Home")
}

const handleLogin = (req, res, next) => {
    return res.end("Login")
}

app.get("/", handleHome)
app.get("/login", handleLogin)

const handleListening = ( ) => {
    console.log("8081 is working")
}

app.listen(PORT, handleListening)

