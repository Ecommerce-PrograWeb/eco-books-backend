﻿import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./index.js";
import { errorHandler } from "./core/errors/error-handler.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3001",
  "http://localhost:3000",
  "http://infrae-front-tbl2mpk59djj-99150187.us-east-2.elb.amazonaws.com"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman) o los origins en la lista
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use((req, _res, next) => {
  console.log("→", req.method, req.path);
  next();
});

app.use("/", router);
app.use((req, res) =>
  res.status(404).json({ message: "Not Found", path: req.path })
);
app.use(errorHandler);

export default app;
