import moviesModel from "../../models/movies.model.js";

export const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, description, rating, thumbnail, trailer, category } =
      req.body;
    const { isadmin } = req.user;
    if (!isadmin) {
      return res
        .status(404)
        .json({ message: "unauthorized update not possible" });
    }

    const updateMovieQueryPayload = {
      title,
      description,
      rating,
      thumbnail,
      trailer,
      category,
    };
console.log(updateMovieQueryPayload);
    const updatedMovieQuery = await moviesModel.findByIdAndUpdate(
      { _id: movieId },
      updateMovieQueryPayload
    );

    const updatedMovieInstance = await moviesModel.findById(movieId);

    return res.json({ success: true, updatedMovie: updatedMovieInstance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
