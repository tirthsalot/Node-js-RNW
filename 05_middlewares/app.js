import express from "express"
import HttpError from "./middleware/HttpError.js";
import checkRoll from "./middleware/checkRoll.js";
import helmet from "helmet";



const app = express ();

//1. Application level

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json("Hello From Server");
});

//2. External Middleware

app.use(helmet());

//3. Route Middleware

app.get("/admin", checkRoll, (req,res)=>{
    res.status(200).json("Admin Route Working");
});

//4. Centralize Error Handling

app.use((error,req,res,next)=>{
    if (req.headersSent){
        next(error);
    }
    res.status(err.statuscode || 500).json({message: error.message || "internal server error"});

});

const port = 5000;

app.listen(port, ()=>{
    console.log("server running on port", port);
});

