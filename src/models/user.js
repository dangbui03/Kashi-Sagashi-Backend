const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
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
      type: String,
      default: "Basic",
      require: true,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
