import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import connectDB from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

// server allows a browser to include cookies on requests
app.use(cors({origin: ENV.CLIENT_URL , credentials:true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/inngest" , serve({client:inngest , functions}))


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