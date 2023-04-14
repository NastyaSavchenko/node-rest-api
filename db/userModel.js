const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema ({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  }, {versionKey: false, timestamps: true});

  userSchema.pre("save", async function () {
    if (this.isNew) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  });

  const User = model("user", userSchema);

module.exports = { User };