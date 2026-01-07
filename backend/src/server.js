import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import connectDB from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

dotenv.config();

const app = express();

// server allows a browser to add cookies ....
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Inngest endpoint (VERY IMPORTANT)
app.use("/api/inngest", serve({ client: inngest, functions }));

const startServer = async () => {
  try {
    await connectDB();

    const PORT = ENV.PORT || 3000;
    app.listen(PORT, () => {
      console.log("🚀 Server listening on", PORT);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();
