require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");
const { logger } = require("./src/utils/logger");

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("MongoDB connected");
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((err) => logger.error("MongoDB connection error:", err));