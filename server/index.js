require("dotenv").config({ path: "dev.env" });
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index.routes.js");
const connectDB = require("./config.js");

const server = express();

// DB Connection
connectDB(process.env.DB_URI);

server.use(cors());
server.use(express.json({ limit: "16kb" }));
server.use(express.urlencoded({ extended: true, limit: "16kb" }));

server.use("/api/v1/quick-reward", rootRouter);

const PORT = process.env.PORT || 7002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
