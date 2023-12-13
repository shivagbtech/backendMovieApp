import moviesModel from "../../models/movies.model.js";

export const addMovies = async (req, res) => {
  try {
    if (!req.user.isadmin) {
      return res
        .status(404)
        .json({ message: "unauthorized access to add movies" });
    }
    console.log("Request body", req.body);

    const { title, description, rating, thumbnail, trailer, category } =
      req.body;

    console.log("body", title);

    const movie = await moviesModel.create({
      title,
      description,
      rating,
      thumbnail,
      trailer,
      category,
    });
    return res.status(200).json({ success: true, result: req.body });
  } catch (err) {
    console.log(err);
  }
};
