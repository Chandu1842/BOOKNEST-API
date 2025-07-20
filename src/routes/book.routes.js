/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 *
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *           example:
 *             title: Clean Code 3
 *             author: Robert C. Martin
 *             publishedDate: 2008-08-01
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *           example:
 *             title: Avengers
 *             author: Robert C. Martin
 *             publishedDate: 2008-08-01
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         publishedDate:
 *           type: string
 *           format: date
 *     BookInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         publishedDate:
 *           type: string
 *           format: date
 */
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
