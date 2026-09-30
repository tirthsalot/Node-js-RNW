import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv";

dotenv.config({path : "./.env"})

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("Hello From Server");
})

app.use((req,res,next)=>{
    return next(new HttpError("Request Route Not Found",404));
})

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    };
    res.status(error.statusCode || 500).json({message:error.message || "Internal Server Error"});
})

const PORT = 5000;

async function startServer() {
    try {
        const connect = await connectDB();
        if(!connect){
            throw new Error("Failed To connect db")
        }
        app.listen(PORT,(err)=>{
            if(err){
                return console.log(err.message);
            }
            console.log(`server running on port ${PORT}`);
        })
        
    } catch (error) {
        console.log(error.message);
        
    }
    
}
startServer();