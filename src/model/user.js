const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      User: {
        type: Number,
        default: 2001
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      require: true,
    },
    refreshToken: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
