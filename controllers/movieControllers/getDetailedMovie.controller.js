import moviesModel from "../../models/movies.model.js";

export const getDetailedMovie = async (req, res) => {
  const id = req.params.movieId;
  const movie = await moviesModel.find({ _id: id });
console.log('movie detail');
  res.json(movie);
};
