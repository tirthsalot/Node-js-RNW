

import express from "express";
import HttpError from "./middleware/httperror.js";
import connectDB from "./config/DB.js";

const app = express();

app.get("/",(req,res)=>{

    return res.json({massage:"Cafe management system"});

})

app.use((req,res,next)=>{

    return next(new httpError("request not found",404))
    
})


app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(new httpError(error.massage));

    }

    return res.status(error.statusCode || 500).json({massage:error.massage || "internal server error"});

})

const port = 5000;


async function startServer() {
    
    try{

        const connect = await connectDB();

        if(!connect){
            throw new Error("failed to connect db")
        }


     app.listen(port,(err)=>{

       if(err){
   
           console.log(err)

        }
    console.log(`server running on port ${port}`);
    
})

    }catch(err){

        console.log(err.massage);

    }
}

startServer();