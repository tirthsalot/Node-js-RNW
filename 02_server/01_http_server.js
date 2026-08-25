
import http from "http";

const server = http.createServer((req, res) => {

    res.send("Welcome to my first server");
});

const PORT = 5000;

server.listen(PORT, (err) => {

    if(err) {
        console.log(err)

        return;
    }

    console.log(`Server is running on port ${PORT}`);

});