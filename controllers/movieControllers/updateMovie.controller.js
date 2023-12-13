import moviesModel from "../../models/movies.model.js";

export const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, description, rating, thumbnail, trailer, category } =
      req.body;

    if (!req.user.isadmin) {
      return res
        .status(404)
        .json({ message: "unauthorized update not possible" });
    }

    console.log("movie_id", movieId);
    console.log("request body", req.body);

    const movie = await moviesModel.findByIdAndUpdate(
      { _id: movieId },
      {
        title,
        description,
        rating,
        thumbnail,
        trailer,
        category,
      }
    );
    const updatedMovieInstance = await moviesModel.findById(movieId);
    return res.json({ success: true, updatedMovie: updatedMovieInstance });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "something went wrong" });
  }
};
