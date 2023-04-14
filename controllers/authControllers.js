const {
  registerUser,
  loginUser,
  getUserById,
  saveToken,
  removeToken,
  updateSubscription,
} = require("../models/users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../db/userModel");
const { avatarSize } = require("../helpers/avatarHelpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const registrationController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const avatarURL = gravatar.url(email);

    const newUser = await registerUser(email, password, avatarURL);
    return res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    next(error.message);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
      _id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    saveToken(user._id, token);

    return res.status(200).json({
      token: token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error.message);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await getUserById(_id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await removeToken(_id);
    return res.status(204).json();
  } catch (error) {
    next(error.message);
  }
};

const getCurrentUserController = async (req, res, next) => {
  try {
    return res.status(200).json({
      user: { email: req.user.email, subscription: req.user.subscription },
    });
  } catch (error) {
    next(error.message);
  }
};

const updateSubscriptionController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { subscription } = req.body;

    const updateUserSubscription = await updateSubscription(
      subscription,
      owner
    );
    if (!updateUserSubscription) {
      return res.status(400).json({ message: "Missing field subscription" });
    }
    return res.status(200).json({ message: "Contact was updated" });
  } catch (error) {
    next(error.message);
  }
};

const updateAvatarController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const resultUpload = path.join(avatarsDir, originalname);

    if (!req.file) {
      return res.status(401).json({ message: "Please upload a file" });
    }

    const filename = `${_id}_${originalname}`;
    await fs.rename(tmpUpload, resultUpload);
    await avatarSize(resultUpload);

    const avatarURL = path.join("avatars", filename);

    const updateUserAvatar = await User.findByIdAndUpdate(_id, { avatarURL });

    if (!updateUserAvatar) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatarController,
};
