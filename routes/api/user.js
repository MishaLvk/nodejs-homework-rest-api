const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index.js");

const {
  register,
  login,
  getContacts,
  current,
  logout,
} = require("../../controllers/user/user.controller.js");

const { auth } = require("../../middlewares/index.js");
const userRouter = express.Router();

userRouter.post("/register", tryCatchWrapper(register));

userRouter.get("/login", tryCatchWrapper(login));

userRouter.get("/", tryCatchWrapper(auth), tryCatchWrapper(getContacts));

userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));

userRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

module.exports = { userRouter };
