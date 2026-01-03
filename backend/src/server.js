import express from "express";
import path from "path";
const app = express();
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import connectDB from "../src/lib/db.js";

dotenv.config();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success from the backend..." });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "Book part is running fine ...." });
});

//making the app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  //Any routes not handled before will be handled here
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server listening on ", ENV.PORT);
    });
  } catch (error) {
    console.error(err);
  }
};


startServer();