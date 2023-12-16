import moviesModel from "../../models/movies.model.js";

export const addMovies = async (req, res) => {
  try {
    const { title, description, rating, thumbnail, trailer, category } =
      req.body;
    const { isadmin } = req.user;

    // checking weather the user has administrative privallage or not
    if (!isadmin) {
      return res
        .status(404)
        .json({ message: "unauthorized access to add movies" });
    }

    const addMovieQueryPayload = {
      title,
      description,
      rating,
      thumbnail,
      trailer,
      category,
    };
console.log(addMovieQueryPayload);
    const movieInstance = await moviesModel.create(addMovieQueryPayload);

    return res.status(200).json({
      success: true,
      message: "Successfully movie added",
      movie: movieInstance,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to add new movie" });
  }
};
