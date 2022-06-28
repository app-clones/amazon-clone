import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api", authRoutes);

mongoose.connect(process.env.MONGODB_URI!, (err) => {
    if (err) throw err;

    console.log("Successfully connected to MongoDB!");
});

app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server started on port ${PORT}`)
);
