import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routers/movies.routes.js";
import userRoutes from "./routers/auth.routes.js";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
// app.use("/", (req, res) => {
//   console.log(req);
//   res.status(404).json({ message: "url does not exist" });
// });

mongoose
  .connect(process.env.mongolink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connecton established");
    app.listen(4000, () => {
      console.log("i am server");
    });
  })
  .catch((err) => console.log(err));
