import express from "express";
const PORT = 8081;
const app = express();

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

const privateMiddleware = (req, res, next) => {
    const url = req.url
    
    if(url == "/protected") {
        return res.send("<h1>Not Allowed</h1>")
    }
    
    console.log("Allowed, you many continue")
    next()
}

const handleHome =  (req, res, next) => {
    return res.send("<h1>Allowed</h1>")
}

const handleProtected =  (req, res, next) => {
    return res.send("<h1>Protected</h1>")
}

const handleLogin = (req, res, next) => {
    return res.end("<h1>Login</h1>")
}

app.use(loggerMiddleware)
app.use(privateMiddleware)
app.get("/", handleHome)
app.get("/protected", handleProtected)
app.get("/login", handleLogin)

const handleListening = ( ) => {
    console.log("8081 is working")
}

app.listen(PORT, handleListening)

