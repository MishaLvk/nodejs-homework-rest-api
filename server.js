const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
dotenv.config();

const { HOST_URI, HOST_PORT } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(HOST_PORT, () => {
      console.log(`Server running. Use our API on port: ${HOST_PORT}`);
    });
  } catch (error) {
    console.error("Error while connection to mangodb", error.message);
    process.exit(1);
  }
}

main();
