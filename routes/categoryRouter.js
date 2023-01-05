const express = require("express");
const {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .patch(updateSingleCategory)
  .delete(deleteCategory);

module.exports = router;
