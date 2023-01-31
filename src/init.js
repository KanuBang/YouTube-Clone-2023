import "dotenv/config";
import "./db";
import "./models/video";
import "./models/User";
import app from "./server";

const PORT = 8083;

const handleListening = () =>{console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);}

app.listen(PORT, handleListening);