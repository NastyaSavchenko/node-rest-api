const { User } = require("../db/userModel");

const registerUser = async (email, password, avatarURL) => {
  const user = await User.create({
    email,
    password,
    avatarURL,
  });
  return user.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  return user;
};

const getUserById = async (_id) => {
  const user = await User.findOne({ _id });
  return user;
};

const saveToken = async (_id, token) => {
  return User.findByIdAndUpdate(_id, {
    $set: { token },
    runValidators: true,
  });
};

const removeToken = async (_id) => {
  return User.findByIdAndUpdate(_id, {
    $set: { token: null },
    runValidators: true,
  });
};

const updateSubscription = async (subscription, owner) => {
  return User.findByIdAndUpdate(owner, {
    $set: { subscription },
    runValidators: true,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  saveToken,
  removeToken,
  updateSubscription,
};

