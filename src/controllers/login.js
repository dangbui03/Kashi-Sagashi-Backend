const jwt = require("jsonwebtoken");
require('dotenv').config();
const Employee = require("../models/user");

const employeeLogin = async (req, role, res) => {
  let { username, password } = req;

  // First Check if the user exist in the database
  const employee = await Employee.findOne({ username });
  if (!employee) {
    return res.status(404).json({
      message: "Employee name is not found. Invalid login credentials.",
      success: false,
    });
  }
  // We will check the if the employee is logging in via the route for his departemnt
  if (employee.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }

  // That means the employee is existing and trying to signin fro the right portal
  // Now check if the password match
  let isMatch = await bcrypt.compare(password, employee.password);
  if (isMatch) {
    // if the password match Sign a the token and issue it to the employee
    let token = jwt.sign(
      {
        role: employee.role,
        name: employee.username,
        email: employee.email,
      },
      process.env.APP_SECRET,
      { expiresIn: "3 days" }
    );

    let result = {
      username: employee.username,
      role: employee.role,
      email: employee.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
    });
  }
};

module.exports = {employeeLogin}