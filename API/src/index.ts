import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes/index";
import "./database/connection";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";

dotenv.config();

const serverPort = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/api", routes);

app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(serverPort, async () => {
  console.log(`Server started on http://localhost:${serverPort}`);
});
