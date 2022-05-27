const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookschema = new Schema({
  book_name: {
    type: String,
    required: "Type the Name of the book",
    unique: true,
    index: "text",
    trim: true,
  },
  publishedon: { type: Date, required: true },
  price: { type: Number, required: true },
  authorid: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
});
module.exports = mongoose.model("Books", bookschema);
