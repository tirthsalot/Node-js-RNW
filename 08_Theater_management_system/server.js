import express from "express";
import httperror from "./middleware/httperror";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("Hello From Server");
})

app.use((req,res,next)=>{
    return next(new httperror("request not found",404));
})

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(new httperror(error.message));
    }
    res.status(error.statuscode ||500).json({message:error.message || "Internal server error"});
});

const port = 5000;