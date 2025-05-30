import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});
//cause obviously connectDB returns a promise
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });
