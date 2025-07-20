/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Bad request
 *     examples:
 *       application/json:
 *         value:
 *           username: chandana
 *           email: chandana@example.com
 *           password: password123
 *           role: admin
 *
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 *     examples:
 *       application/json:
 *         value:
 *           username: deepak
 *           password: password123
 */
const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
