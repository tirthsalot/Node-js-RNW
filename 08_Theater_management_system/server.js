import express from "express";
import HttpError from "./middleware/httpError.js";
import Connectdb from "./config/db.js";

import dotenv from "dotenv";
import theater from "./model/theater.model.js";
import theaterRoutes from "./routes/theater.routes.js"
dotenv.config({});

const app = express();

app.use(express.json());

app.use("/theaterRoutes",theaterRoutes)
app.get("/", (req, res) => {
    res.json("Hello From Server");
});


app.use((req, res, next) => {
    return next(
        new HttpError("Request not found", 404)
    );
});


app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });
});


const port =  5000;


async function startServer() {

    try {

        const connect = await Connectdb();

        if (!connect) {
            throw new Error("Failed to connect DB");
        }

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {

        console.log(err.message);

    }
}

startServer();