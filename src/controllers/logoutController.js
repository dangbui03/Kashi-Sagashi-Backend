const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On Client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); // No content
  const refreshToken = cookies.jwt;

  //Is refreshToken in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  const currentUsers = {...foundUser, refreshToken: ''};
  usersDB.setUsers([...otherUsers, ])
};

module.exports = { handleRefreshToken };
