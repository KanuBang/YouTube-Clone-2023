import express from "express";
const PORT = 8081;
const app = express();

const fake = (req, res, next) => {
    console.log(`someonde is going to: ${req.url}`)
    next()
}

const handleHome =  (req, res, next) => {
    return res.send({msg: "hello"})
}

const handleLogin = (req, res, next) => {
    return res.end("<h1>Login</h1>")
}


app.get("/", fake, handleHome)
app.get("/login", handleLogin)

const handleListening = ( ) => {
    console.log("8081 is working")
}

app.listen(PORT, handleListening)

