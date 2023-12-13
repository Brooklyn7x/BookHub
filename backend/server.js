const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/bookModel");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Add a book
app.post("/add/book", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Product.find({});
    res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Product.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Product.findByIdAndRemove(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:Shubham123@cluster0.lkkoqls.mongodb.net/bookstore?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(4000, () => {
      console.log("node app is running");
    });
  })
  .catch((e) => {
    console.log(e);
  });
