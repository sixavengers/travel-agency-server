// ---------------Generate password reset code-----------------
exports.genaretCodeReset = (length) => {
    let code = "";
    let schema = "0123456789";
    for (let i = 0; i < length; i++) {
      code += schema.charAt(Math.floor(Math.random() * schema.length));
    }
    return code;
  };
  
  const jwt = require("jsonwebtoken");

  // ---------------Generate Token-----------------
exports.genaretCode = (payload, expire) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: expire,
  });
};