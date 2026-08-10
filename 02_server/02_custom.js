
import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome to my custom server</h1>");
    res.end();
})

const port = 5001;

server.listen(port, (err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log(`Server is running on port ${port}`);
});
