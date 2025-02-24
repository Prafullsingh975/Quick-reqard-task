const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const User = require("../model/user.model");

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new ApiError(404, "Token not found");
    }

    const { id } = await jwt.verify(token, process.env.SECRET);

    if (!id) throw new ApiError(403, "Invalid token");

    const data = await User.findById(id).select(
      "firstName lastName mobile email"
    );

    if (!data) throw new ApiError(404, "User not found");
    req.user = data;
    next();
  } catch (error) {
    throw new ApiError(500);
  }
};

module.exports = { auth };
