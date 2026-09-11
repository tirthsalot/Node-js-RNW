import express from "express";
import HttpError from "./middleware/httperror.js";
import connectDB from "./config/db.js";
import cafeRoutes from "./routes/cafe.routes.js"

const app = express();

app.use(express.json())

app.use("/cafe",cafeRoutes)

app.get("/", (req, res) => {

    return res.json({
        message: "Cafe management system"
    });

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

    return res
        .status(error.statusCode || 500)
        .json({
            message: error.message || "Internal server error"
        });

});


const port = 5000;


async function startServer() {

    try {

        const connect = await connectDB();

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