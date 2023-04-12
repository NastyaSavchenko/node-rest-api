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

  registerValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        // eslint-disable-next-line no-useless-escape
        .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: Joi.string()
        .min(4)
        // .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,40}$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }

    next();
  },

  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(4).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }

    next();
  },

  subscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid("starter", "pro", "business"),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }

    next();
  },
};
