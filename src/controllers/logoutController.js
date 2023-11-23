const User = require("../model/user");
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  try {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      }); //
      return res.sendStatus(204).json("cookies clear");
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" }); //
    res.sendStatus(204).json("success logout");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogout };
