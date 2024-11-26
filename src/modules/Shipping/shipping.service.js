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
module.exports = {}