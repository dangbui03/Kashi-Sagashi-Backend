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
    googleId: {
      type: String,
      unique: true,
    },
    role: {
      User: {
        type: Number,
        default: 2001,
      },
      Admin: Number,
    },
    verify: {

    },
    profileImage: String,
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
