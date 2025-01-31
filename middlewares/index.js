const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js");
const multer = require("multer");
const path = require("path");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    // console.log("user", user);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }
    throw error;
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
  // limits: {},
});

module.exports = {
  auth,
  upload,
};
