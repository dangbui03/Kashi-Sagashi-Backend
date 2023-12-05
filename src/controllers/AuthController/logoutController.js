const User = require("../../model/user");
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  try {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      }); //
      return res.status(200).json({ message: "Cookies Clear" });
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" }); //
    res.status(200).json({ message: "Success Logout" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogout };
