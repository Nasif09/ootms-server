const bcrypt = require("bcrypt");

const User = require("./user.model");
const response = require("../../helpers/response");

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Login credentials are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with the given email');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Password does not match');
  } else {
    return user;
  }
}

//find assigned load by user id
const findUserById = async (id) => {
  return await User.findById(id);
}


const getUserByEmail = async (email) => {
  if (!email) {
    return response({ message: 'email is required' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No user found", errors: error.message });
  }
  return user;
}


const addUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
}

const updateUser = async (userData, id) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return await user.save();
}

const getUser = async (filter) => {
  const driver = await User.find(filter);
  return driver;
}

module.exports = {
  login,
  updateUser,
  getUserByEmail,
  addUser,
  findUserById,
  getUser
}
