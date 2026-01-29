import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import taskRoute from "./routes/taskRoute.js";

dotenv.config();

//set dns cho server node
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json());
//middleware handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

//public routes
app.use("/api", taskRoute);

//private routes

connectDB().then(
  app.listen(PORT, () => {
    console.log("Server đang chạy trên cổng 5001");
  }),
);
