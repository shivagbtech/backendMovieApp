import moviesModel from "../../models/movies.model.js";

export const getAllMovies = async (req, res) => {
  try {
    const moviesInstance = await moviesModel.find();

    if (!moviesInstance)
      return res.status(404).json({
        status: false,
        message: "No Movies Found",
      });

    res.status(200).json({
      status: true,
      message: "Successfully Fetched All movies",
      result: moviesInstance,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: "Failed to fetch all movies",
    });
  }
};
