const mongoose = require("mongoose");
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A category must have name"],
    unique: true,
    trim: true,
  },
  slug: String,
  imageURL: String
});

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
