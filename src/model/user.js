const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
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
    verified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
  { typeKey: '$type' },
);

module.exports = mongoose.model("user", userSchema);
