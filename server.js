import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import connectDB from "./db/connect.js";

// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// Routers
import authRouter from "./routes/authRoutes.js";
import accRouter from "./routes/accRoutes.js";

// Middleware
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
  auth,
} from "./middleware/index.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user-account", auth, accRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
