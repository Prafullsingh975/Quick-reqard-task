const { startSession } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../model/user.model");
const ApiResponse = require("../utils/ApiResponse");

const signUpUser = asyncHandler(async (req, res) => {
  const session = await startSession();
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      dob,
      pinCode,
      password,
      referralCode,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !dob ||
      !pinCode ||
      password
    )
      throw new ApiError(400, "Fill all the required field");
    session.startTransaction();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let rewardPoint = 200;
    if (referralCode) {
      const referral = await User.findOneAndUpdate(
        { mobile: referralCode },
        { $inc: { rewardPoints: 100 } },
        { new: true, session }
      );

      if (referral) throw new ApiError(400, "Invalid Referral Code");
      rewardPoint += 100;
    }

    const user = await User.create(
      [
        {
          firstName,
          lastName,
          mobile,
          email,
          dob,
          pinCode,
          password: hash,
          rewardPoint,
        },
      ],
      { session }
    );

    const token = await jwt.sign(
      { id: user._id, mobile, email },
      process.env.SECRET
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { token },
          `You receive welcome bonos of ${rewardPoint}`
        )
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, "Error in user registration", error);
  }
});

const login = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password)
    throw new ApiError(400, "Mobile and Password are required");

  const data = await User.findOne({ mobile });

  if (!data) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = await jwt.sign(
    { id: data._id, mobile: data.mobile, email: data.email },
    process.env.SECRET
  );
  return res
    .status(200)
    .json(new ApiResponse(200, { token }, `Login successfully`));
});

const userInfo = asyncHandler(async (req, res) => {
  const data = await User.findById(req.user._id).select(
    "firstName lastName mobile email rewardPoints"
  );

  if (!data) throw new ApiError(401, "Invalid Credentials");

  return res.status(200).json(new ApiResponse(200, data, "User Info fetched"));
});

const userController = { signUpUser, login, userInfo };
module.exports = userController;
