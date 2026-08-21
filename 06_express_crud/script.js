
import express from "express";

import HttpError from "./middleware/HttpError.js";

const app = express();

const taskList = [
    {
        id: 1,
        task: "lession",
        description: "You have submit the work before 5 PM."
    },
    {
        id: 2,
        task: "Project",
        description: "Submit project in time."
    },
    {
        id: 3,
        task: "Activity",
        description: "prepare your performance for performing on stage."
    }
];

app.get("/",(req,res)=>{
    res.json({message: "Express Crud Operation"})
})

app.get("/taskList",(req,res,next)=>{
    if(taskList.length === 0){

        return res.status(200).json({message: "No task data available"})
    }

    res.status(200).json({message:"data added successfully",taskList})
})

// undefined middleware

app.use((req,res,next)=>{

    return next(new HttpError("Request Not Found"));
})

app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(error)
    }

    res.status(error.statusCode || 500).json({message:error.message || "Internal server error"});
})

const port = 5000;

app.listen(port,(err)=>{

    if(err){

        return console.log(err);
    }

    console.log(`server running on port ${port}`);
})