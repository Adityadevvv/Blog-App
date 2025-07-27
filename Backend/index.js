const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./model"); // Using model directly

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ POST - Create blog
app.post("/posts", async (req, res) => {
  try {
    const newPost = new Blog(req.body);
    await newPost.save();
    res.status(201).json({ message: "Blog created", data: newPost });
  } catch (err) {
    res.status(400).json({ message: "Failed to create blog", error: err });
  }
});

// ✅ GET - Fetch all blogs
app.get("/posts", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs", error: err });
  }
});

// ✅ DELETE - Delete a blog
app.delete("/posts/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog", error: err });
  }
});

// ✅ PUT - Update a blog
app.put("/posts/:id", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Blog updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog", error: err });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
