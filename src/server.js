import express from "express";
const PORT = 8081;
const app = express();

const handleListening = ( ) => {
    console.log("8081 is working")
}
app.listen(PORT, handleListening)

