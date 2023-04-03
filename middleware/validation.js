const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }

    next();
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details });
    }

    next();
  },

  updateStatusContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details });
    }

    next();
  },

  objectIdValidation: (req, res, next) => {
    if (!isValidObjectId(req.params.contactId)) {
      return res
        .status(400)
        .json({ message: `${req.params.contactId} not found` });
    }

    next();
  },
};
