const User = require ('../../model/user')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, pwd, username } = req.body;
    if (!email || !pwd || !username) return res.status(400).json({ 'message': 'Email and password are required.' });

    // check for duplicate usernames in the db
    const existedEmail = await User.findOne({ email: email, username: username });
    if (existedEmail) return res.status(400).json({ message: 'Email is already registered' });

    if (pwd.length < 8) {
      return res.status(400).json({ message: "password less than 8 characters" });
    }
    try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);
      //store the new user
      const result = new User({
          "username": username,
          "email": email,
          "roles": { "User": 2001 },
          "password": hashedPwd,
      });
      const user = await result.save();

      res.status(201).json({ 'message': `New user ${email} created!`, user });
  } catch (err) {
      res.status(500).json({ 'message': err.message });
  }
}


module.exports = { handleNewUser };
