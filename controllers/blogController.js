const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find()

  res.status(200).json({
    status: "Success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const newBlog = await Blog.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      blog: newBlog,
    },
  });
});

exports.getSingleBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('author', ['name', 'surname', 'photo']);

  if (!blog) {
    return next(new AppError("No blog found with that id", 404));
  }

  res.status(200).json({
    status: "Success",
    results: blog.length,
    data: {
      blog,
    },
  });
});

exports.updateSingleBlog = catchAsync(async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    return next(new AppError("No blog found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      blog: updatedBlog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);

  if (!blog) {
    return next(new AppError("No blog found with that id", 404));
  }

  res.status(204).json({
    status: "success",
  });
});

exports.getNewestBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(6)

  res.status(200).json({
    status: "Success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.getRandomHeroBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.aggregate([{ $sample: { size: 8 } }])

  res.status(200).json({
    status: "Success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.getUserAllPost = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ "author": req.params.id })

  res.status(200).json({
    status: "Success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.getAllBlogsInCategory = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find({ "categories": req.params.categoryName })

  res.status(200).json({
    status: "Success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});
