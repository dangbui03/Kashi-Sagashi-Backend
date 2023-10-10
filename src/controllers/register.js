const user = require("../models/users");
const bcrypt = require("bcrypt");

//Get employee from database with same name if any
const validateEmployeename = async (username) => {
  let employee = await Employee.findOne({ username });
  return employee ? false : true;
};

//Get employee from database with same email if any
const validateEmail = async (email) => {
  let employee = await Employee.findOne({ email });
  return employee ? false : true;
};

const employeeSignup = async (req, role, res) => {
  try {
    // Validate the name
    let nameNotTaken = await validateEmployeename(req.username);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: `Employee name is already taken.`,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(req.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
      });
    }

    // Hash password using bcrypt
    const password = await bcrypt.hash(req.password, 12);
    // create a new user
    const newEmployee = new Employee({
      ...req,
      password,
      role,
    });

    await newEmployee.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
    });
  } catch (err) {
    // Implement logger function if any
    return res.status(500).json({
      message: `${err.message}`,
    });
  }
};

module.exports = {
  employeeSignup,
}