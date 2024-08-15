import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookSchema = new mongoose.Schema({
  book_title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  publication_date: { 
    type: Date,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  page_count: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);
export default Book