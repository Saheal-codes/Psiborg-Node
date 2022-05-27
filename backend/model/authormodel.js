const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorschema = new Schema({
  name: {
    type: String,
    required: "Type the Name of the auther",
    index: true,
    trim: true,
  },
  age: {
    type: Number,
    required: "Type the Age of the auther",
    trim: true,
  },
  dateofbirth: {
    type: Date,
    required: "Type the Date of Birth of the auther",
  },
});
module.exports = mongoose.model("Author", authorschema);
