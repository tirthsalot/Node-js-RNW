
import express from "express";

const app = express();

app.get("/", (req, res) => {

    res.json({
        message: "This is Home Page",
    })
})

app.get("/about",(req,res) => {
    res.json({
        message: "This is About Page",
    })
});

// Middleware

app.use("/json",(req,res,next)=>{
    res.json({
        message: "This is Json Format",
    })
})

const Actor = [

    {
        name : "Antony",
        film : "kattlan",
        language : "Tamil",
    },

    {
        name : "Marco",
        film : "Marco",
        language : "Kannad"
    }
]

app.use("/actor",(req,res)=>{

    res.json(Actor);
})

const port = 5000;

app.listen(port,(err)=>{

    if(err){
        console.log(err.message)

        return;

    }

    console.log(`Server Running On Port ${port}`)
})