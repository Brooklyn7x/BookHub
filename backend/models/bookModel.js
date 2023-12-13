const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the book title"],
    },
    author: {
      type: String,
      required: [true, "Please enter the author's name"],
    },
    genre: {
      type: String,
      required: [true, "Please enter the book genre"],
    },
    description: {
      type: String,
      required: [true, "Please enter a book description"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
