const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorschema = new Schema({
  name: {
    type: String,
    required: "Type the Name of the author",
    index: true,
    trim: true,
  },
  age: {
    type: Number,
    required: "Type the Age of the author",
    trim: true,
  },
  dateofbirth: {
    type: Date,
    required: "Type the Date of Birth of the author",
  },
});
module.exports = mongoose.model("Author", authorschema);
