const router = require("express").Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const { validateBook } = require("../validators/book.validator");
const { authorize } = require("../middlewares/auth.middleware");

router.get("/", getBooks);
router.post("/", validateBook, addBook);
router.put("/:id", validateBook, updateBook);
router.delete("/:id", authorize("admin"), deleteBook);

module.exports = router;