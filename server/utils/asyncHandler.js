const ApiError = require("./ApiError");

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log(error);
    throw new ApiError(500);
  }
};

module.exports = asyncHandler;
