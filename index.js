import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routers/movies.routes.js";
import userRoutes from "./routers/auth.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = 4000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// routes
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/", (req, res) => {
  res.status(404).json({ message: "url does not exist" });
});

const dbConnect = async () => {
  await mongoose
    .connect(process.env.mongolink)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => console.log(err));
};

const serverConnection = async () => {
  try {
    dbConnect()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running at ${PORT}`);
        });
      })
      .catch((error) => console.log(error.message));
  } catch (error) {
    throw error;
  }
};

serverConnection();
