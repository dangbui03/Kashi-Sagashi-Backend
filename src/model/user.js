const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      unique: true,
    },
    username: {
      type: String,
    },
    googleId: {
      type: String,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Admin: Number,
    },
    profileImage: String,
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
