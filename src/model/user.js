const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      User: {
        type: Number,
        default: 2001
      },
      Editor: Number,
      Admin: Number,
    },
    refreshToken: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
