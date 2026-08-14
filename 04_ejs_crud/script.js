
import express from "express"

const app = express();

app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs")



const company = [

    {
        name:"Nirma",
        year:1999
    },
    {
        name:"Excel",
        year:2001
    }
]

app.get("/",(req,res)=>{

    res.render("index",{company})

});

app.get("/add",(req,res)=>{

    res.render("add")
})

app.post("/add",(req,res)=>{
    const {name} = req.body

    const newCompany={
        id:new Date().getTime(),
        name,
    }

    company.push(newCompany);

    res.redirect("/")
})

const port = 5000;

app.listen(port,(err)=>{

    if(err){
        console.log(err)
    }

    console.log(`Server Running On Port ${port}`)
})

