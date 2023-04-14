const jimp = require("jimp");

const avatarSize = async (resultUpload) => {
  try {
    const image = await jimp
      .read(resultUpload)
      .resize(250, 250)
      .writeAsync(resultUpload);
    return image;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { avatarSize };
