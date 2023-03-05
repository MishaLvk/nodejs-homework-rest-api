const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index.js");

const {
  register,
  login,
  getContacts,
  current,
  logout,
  uploadImage,
  verifyEmail,
  reVerifyEmail,
} = require("../../controllers/user/user.controller.js");

const { auth, upload } = require("../../middlewares/index.js");
const userRouter = express.Router();

userRouter.post("/register", tryCatchWrapper(register));

userRouter.get("/login", tryCatchWrapper(login));

userRouter.get("/", tryCatchWrapper(auth), tryCatchWrapper(getContacts));

userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));

userRouter.get("/verify/:token", tryCatchWrapper(verifyEmail));

userRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

userRouter.post("/verify", tryCatchWrapper(reVerifyEmail));

userRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  upload.single("avatar"),
  tryCatchWrapper(uploadImage)
);

module.exports = { userRouter };
