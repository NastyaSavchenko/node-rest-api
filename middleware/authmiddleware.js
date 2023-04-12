const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(
      res.status(401).json({
        message: "Token is required",
      })
    );
  }

  try {
    const verify = jwt.verify(token, SECRET_KEY);
    if (!verify) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const user = await User.findById(verify._id);

    if (!user) {
      next(
        res.status(401).json({
          message: "Not authorized",
        })
      );
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(
      res.status(401).json({
        message: error.message,
      })
    );
  }
};

module.exports = { authMiddleware };