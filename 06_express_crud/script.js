
import express from "express";

import HttpError from "./middleware/HttpError.js";


const app = express();

app.use(express.json())


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

app.get("/taskList/:id",(req,res,next)=>{

    try{
        const {id} = req.params

        const task = taskList.find((t)=>t.id === Number(id));

        if(!task){

            return res.status(200).json({message:"No task data available"})
        }

        res.staus(200).json({message:"id Visible",task})
    }

    catch(error){
        return next(new HttpError("Request Not Found"));
        
    }
})
//create

app.post("/task/add",(req,res,next)=>{

    const { task, description} = req.body;

    if (!task || !description) {
        return next(new HttpError("Task or description date are required",400));
    }

    const newTask = {
        id: new Date().getTime(),
        task,
        description,
    };

    taskList.push(newTask);

    res.status(201).json({success: true, message:"New task added successfully",newTask});



});

//Delete 

app.delete("/task/:id",(req,res,next)=>{

    try {
        const { id } = req.params;

        const deleteData = taskList.findIndex((t)=>t.id === Number(id));

        if(deleteData === -1){

            return next(new HttpError("task not found in id",404));
        }
        taskList.splice(deleteData,1);

        res.status(200).json({success:true,message:"task deleted successfully"});

    } catch (err) {

        return next(new HttpError("Request Not Found"));
        
    }
})

//Update

app.patch("/UpdateTask/:id",(req,res,next)=>{

    try{

        const {id} = req.params;

        const {task,description} = req.body;

        const dataTask = taskList.find((t)=>t.id === Number(id));

        if(dataTask === undefined && taskList === undefined){

            return next(new HttpError("task not found id is updated",400));
        }

        if(task){
            dataTask.task = task;
        }
        if(description){
            dataTask.description = description;
        }

        if(task === undefined && taskList === undefined){
    return next(new HttpError("task or description data is required", 400));

        }

        res.status(200).json({success:true,message:"task data updated",dataTask});

    }catch(err){
        return next(new HttpError("request not found "))
    }

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