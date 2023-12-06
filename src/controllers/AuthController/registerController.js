const User = require("../../model/user");
const bcrypt = require("bcrypt");
const sendOTPEmailVerificationController = require("../EmailVerificationController/SendEmailVerificationController");

const handleNewUser = async (req, res) => {
  const { email, pwd, username } = req.body;
  if (!email || !pwd || !username)
    return res.status(403).json({ message: "All fields are required." });

  // check for duplicate usernames in the db
  const existedEmail = await User.findOne({ email: email, username: username });
  if (existedEmail)
    return res.status(404).json({ message: "Email is already registered." });

  if (pwd.length < 8) {
    return res
      .status(400)
      .json({ message: "Password less than 8 characters." });
  }
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const result = new User({
      username: username,
      email: email,
      roles: { User: 2001 },
      password: hashedPwd,
    });
    const user = await result.save();

    const a = await sendOTPEmailVerificationController.sendVerificationOTPEmail(
      { email }
    );
    console.log(a);
    res.status(201).json({ message: `New user ${email} created!`, user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
