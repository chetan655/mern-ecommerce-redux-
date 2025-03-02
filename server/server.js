import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    }),
);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("server started on port: ", PORT);
        });
    })
    .catch((error) => {
        console.log("error connecting db.", error);
    });

app.use(cookieParser());
app.use(express.json());
