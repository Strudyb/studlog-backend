const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A blog must have title"],
    unique: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: [true, "A blog must have short description"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "A blog must have content"],
    trim: true,
  },
  imageCover: {
    type: String,
    trim: true,
    required: [true, "A blog must have cover image"],
  },
  image: String,
  categories: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    // default: "Admin",
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
