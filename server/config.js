const mongoose = require("mongoose");

const connectDB = async (DB_URI) => {
  try {
    const { connection } = await mongoose.connect(DB_URI);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Error in DB connection", error);
  }
};

module.exports = connectDB;
