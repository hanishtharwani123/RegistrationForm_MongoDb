const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  confirmpassword: {
    type: String,
    required: true,
    unique: true,
  },
});

// Now we need to create a collection
const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;
