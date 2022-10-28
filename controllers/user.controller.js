/* Register User */
const register = async (req, res) => {
  res.send({ success: true, message: "Register User" });
};

/* Login User */
const login = async (req, res) => {
  res.send({ success: true, message: "Login User" });
};

/* Current User */
const currentUser = async (req, res) => {
  res.send({ success: true, message: "Current User" });
};

// exports
module.exports = { register, currentUser, login };
