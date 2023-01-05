const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  updateSingleBlog,
  deleteBlog,
  getNewestBlogs,
  getRandomHeroBlogs,
  getUserAllPost,
  getAllBlogsInCategory
} = require("../controllers/blogController");

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/random").get(getRandomHeroBlogs)
router.route("/newest").get(getNewestBlogs)
router.route("/user-posts/:id").get(getUserAllPost)
router.route("/category/:categoryName").get(getAllBlogsInCategory)
router
  .route("/:id")
  .get(getSingleBlog)
  .patch(updateSingleBlog)
  .delete(deleteBlog);


// router.route('/:id').get().patch().delete()

module.exports = router;
