import moviesModel from "../../models/movies.model.js";

export const deleteMovie = async (req, res) => {
  try {
    if (!req.user.isadmin) {
      return res.status(404).json({ message: "unauthorized delete not possible" });
    }

    const { movieId } = req.query;

    console.log(movieId);
    
    const movie = await moviesModel.deleteOne({ _id: movieId });
    res.json({ success: true, movie });
  } catch (err) {
    console.log(err);
  }
};
