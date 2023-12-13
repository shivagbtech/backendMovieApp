import mongoose from "mongoose";

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  category: [String],
});

const moviesModel = mongoose.model("movies", moviesSchema);

export default moviesModel;
