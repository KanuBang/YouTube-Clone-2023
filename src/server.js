import express from "express";
const PORT = 8081;
const app = express();

app.get("/", (req, res, next) => {
    res.send("here")
})
const handleListening = ( ) => {
    console.log("8081 is working")
}
app.listen(PORT, handleListening)

