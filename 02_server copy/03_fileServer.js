import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    fs.readFile("./index.html", (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});