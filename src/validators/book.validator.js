const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedDate: Joi.date().optional(),
  summary: Joi.string().optional(),
});

exports.validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};