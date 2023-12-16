import express from "express";

import { authentication } from "../utils/verifyToken.js";
import { getAllMovies } from "../controllers/movieControllers/getAllMovies.controller.js";
import { getDetailedMovie } from "../controllers/movieControllers/getDetailedMovie.controller.js";
import { deleteMovie } from "../controllers/movieControllers/deleteMovie.controller.js";
import { addMovies } from "../controllers/movieControllers/addMovie.controller.js";
import { updateMovie } from "../controllers/movieControllers/updateMovie.controller.js";

const router = express.Router();

router.put("/update-movie/:movieId", authentication, updateMovie);
router.get("/get-movies", authentication, getAllMovies);
router.get("/get-movie/:movieId", authentication, getDetailedMovie);
router.delete("/remove-movie/:movieId", authentication, deleteMovie);
router.post("/add-movie", authentication, addMovies);

export default router;
