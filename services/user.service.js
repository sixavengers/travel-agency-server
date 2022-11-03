const User = require("../Models/User");
const bcrypt = require("bcrypt");
exports.registerUserService = async(userInfo) => {
    try {
        const {
            email,
            password,
        } = userInfo;
        // check if user already exists
        const check = await User?.findOne({ email });
      if (check) {
      return res.status(400).json({
        messages: "This email is already Exists Try Another One",
      });
    }
    const hastPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        email,
        password: hastPassword,
        ...userInfo
    });
    return user;
    } catch (error) {
        throw error;
    }
}
