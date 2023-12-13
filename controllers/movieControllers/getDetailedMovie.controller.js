import moviesModel from "../../models/movies.model.js";

export const getDetailedMovie = async (req, res) => {
  const id = req.query.movieId;
  const movie = await moviesModel.find({ _id: id });

  res.json(movie);
};
