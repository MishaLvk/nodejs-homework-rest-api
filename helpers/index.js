require("dotenv").config();
const sandGrid = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

async function sendEmail({ to, subject, html }) {
  sandGrid.setApiKey(SENDGRID_API_KEY);
  const msg = {
    from: "lvk.misha@meta.ua",
    to,
    subject,
    html,
    text: "and easy to do anywhere, even with Node.js",
  };

  try {
    await sandGrid.send(msg);
    console.log("msg відправлено");
  } catch (error) {
    console.error("нечого не вийшло");
  }
}

module.exports = {
  tryCatchWrapper,
  sendEmail,
};
