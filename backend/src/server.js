import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js";
import taskRoute from "./routes/taskRoute.js";
import path from "path";

dotenv.config();

//set dns cho server node
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== " production") {
  //middleware handle cors
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
}

//public routes
app.use("/api", taskRoute);

//private routes

// luôn chạy sau routes
if (process.env.NODE_ENV === "production") {
  //server static files(đưa frontend và backend về chung 1 cổng)
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*\w", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(
  app.listen(PORT, () => {
    console.log("Server đang chạy trên cổng 5001");
  }),
);
