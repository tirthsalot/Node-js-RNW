
import express from "express"

const app = express();

app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs")



let company = [

    {
        id:1,
        name:"Nirma",
        year:1999
    },
    {
        id:2,
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

app.get("/delete/:id",(req,res)=>{

    const { id } = req.params

    const Foundcompany = company.find((c)=>c.id === Number(id));

    if(!Foundcompany){
        return res.json({message:"company not found"})
    }

    company = company.filter((c)=>c.id !== Foundcompany.id);

    res.redirect("/");

})

app.get("/edit/:id",(req,res)=>{

    const { id } = req.params

    const Foundcompany  = company.find((c)=>c.id === Number(id));

    if(!Foundcompany){

        return res.json({message:"company not found"})
    }

  
   res.render("edit",{company:Foundcompany})
})

app.post("/edit/:id",(req,res)=>{

    const {id} = req.params

    const Foundcompany = company.find((c)=>c.id === Number(id));

    if(!Foundcompany){

        return res.json({message:"company not found"})
    }

    const { name } = req.body
    
    Foundcompany.name = name;

    res.redirect("/");
})



const port = 5000;

app.listen(port,(err)=>{

    if(err){
        console.log(err)
    }

    console.log(`Server Running On Port ${port}`)
})

