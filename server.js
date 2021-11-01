///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const BlogSchema = new mongoose.Schema({
  title: String,
  image: String,
  desc: String,
  
});

const Blog = mongoose.model("Blog", BlogSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// BLOG INDEX ROUTE
app.get("/blog", async (req, res) => {
  try {
    // send all blog
    res.json(await Blog.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// BLOG CREATE ROUTE
app.post("/blog", async (req, res) => {
  try {
    // send all 
    res.json(await Blog.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// BLOG DELETE ROUTE
app.delete("/blog/:id", async (req, res) => {
  try {
    // send all blog
    res.json(await Blog.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//BLOG UPDATE ROUTE
app.put("/blog/:id", async (req, res) => {
  try {
    // send all blog
    res.json(
      await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



