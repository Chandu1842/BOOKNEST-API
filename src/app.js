const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const { authenticate } = require("./middlewares/auth.middleware");
const { swaggerUi, specs } = require("./utils/swagger");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Root route for health check or welcome message
app.get('/', (req, res) => {
  res.send('Booknest API is running!');
});

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/books", authenticate, bookRoutes);

app.use(errorHandler);
module.exports = app;
