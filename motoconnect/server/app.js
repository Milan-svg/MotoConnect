import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // middlewares/configurations use krne ke liye

app.use(express.json({ limit: "16kb" })); //Json data accept krne ke liye
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public")); //3. Middleware hai.used to serve static files to the client (html/css/js/imgs/pdfs/etc) directly from our directory("public" in this case) instead of generating em via the server.

app.use(cookieParser());
export { app };
