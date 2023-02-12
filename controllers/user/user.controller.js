// const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.js");

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      data: {
        savedUser: {
          email,
          subscription: savedUser.subscription,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return res.status(409).json({ message: "Email in use" });
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await User.findByIdAndUpdate(storedUser._id, { token });
  return res.json({
    data: {
      token,
      storedUser: {
        email,
        subscription: storedUser.subscription,
      },
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContact = await User.findById(user._id).populate("contact", {
    phone: 1,
    name: 1,
    email: 1,
  });

  res.status(200).json({
    data: {
      contacts: userWithContact.contact,
    },
  });
}

async function current(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;
  res.status(201).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
}

async function logout(req, res, next) {
  const { user } = req;
  const { _id } = user;

  await User.findByIdAndUpdate(_id, { token: null });
  return res.status(204).json({
    data: "cr_Con",
  });
}

module.exports = {
  register,
  login,
  getContacts,
  current,
  logout,
};
