import "./db";
import "./models/video";
import app from "./server";

const PORT = 8081;

const handleListening = () =>{console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);}

app.listen(PORT, handleListening);