const mongoose = require("mongoose");

// Define schema correctly
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("Blog", blogSchema);
