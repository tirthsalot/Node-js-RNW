
import http from "http";

const server = http.createServer((req, res) => {
    if(req.url==="/"){
        res.end("This is the home page");
    }else if(req.url==="/about"){
        res.end("This is the about page");
    }else if(req.url==="/contact"){
        res.end("This is the contact page");
    }else if(req.url==="/services"){
        res.end("This is the services page");
    }else if(req.url==="/help"){
        res.end("This is the help page");
    }else{
        res.end("404 page not found");
    }
});

const port = 5002;

server.listen(port, (err) => {
    if(err) { 
        return console.log(err.message);

    }
    console.log(`Server is running on port ${port}`);
}); 