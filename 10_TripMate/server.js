
import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import travelRouter from "./routes/travel.routes.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

app.use("/travel", travelRouter);

app.get("/", (req, res) => {
    res.json("Welcome To The TripMate");
});

app.use((req, res, next) => {
    return next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
    });
});

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();
