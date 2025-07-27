const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("DB Connection Error:", error);
  });
