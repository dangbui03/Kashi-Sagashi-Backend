const User = require ('../model/user')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 

  if (pwd.length < 8) {
    return res.sendStatus(400).json({ message: "password less than 8 characters" });
}
  try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);
      //store the new user
      const result = await new User({
          "email": email,
          "roles": { "User": 2001 },
          "password": hashedPwd
      });
      const user = await result.save();
      
      console.log(user);
      res.status(201).json({ 'success': `New user ${email} created!` });
  } catch (err) {
      res.status(500).json({ 'message': err.message });
  }
}

module.exports = { handleNewUser };
