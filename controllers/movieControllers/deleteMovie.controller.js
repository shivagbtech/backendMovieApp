import moviesModel from "../../models/movies.model.js";

export const deleteMovie = async (req, res) => {
  try {

    const {isadmin} =req.user
    if (!isadmin) {
      return res.status(404).json({ message: "unauthorized delete not possible" });
    }

    const { movieId } = req.params;

    
    const movie = await moviesModel.deleteOne({ _id: movieId });
    res.json({ success: true, movie });
  } catch (error) {
    return res
      .status(400)
      .json({ success:false,message: error.message });
  }
};
