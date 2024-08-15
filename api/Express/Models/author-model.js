import mongoose from "mongoose";
const Schema = mongoose.Schema;
const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    trim: true
  },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]

}, { timestamps: true });

const Author = mongoose.model('Author', authorSchema);
export default Author;
