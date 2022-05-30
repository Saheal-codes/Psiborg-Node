const bookmodel = require("../model/bookmodel");
const authormodel = require("../model/authormodel");

exports.getbooks = async (req, res) => {
  try {
    console.log(req.params.book_name);
    let all_books = await bookmodel.find({}).populate("authorid");
    res.send(all_books);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
exports.createbook = async (req, res) => {
  try {
    let author = await authormodel.findOne({ _id: req.body.authorid });
    if (!author) {
      return res
        .status(400)
        .send({ message: "There is no Author with this ID" });
    }
    let book = await bookmodel.create({
      authorid: req.body.authorid,
      book_name: req.body.book_name,
      publishedon: req.body.publishedon,
      price: req.body.price,
    });
    res.send({ message: "BOOK ENTRY CREATED !", book });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.deletebook = async (req, res) => {
  try {
    let deletebook = await bookmodel.findOneAndDelete({ _id: req.body._id });
    res.send({ message: "BOOK ENTRY deleTED !", deletebook });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
