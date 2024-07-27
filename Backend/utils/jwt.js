const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Replace with a more secure key in production

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
