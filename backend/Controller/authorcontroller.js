const authormodel = require("../model/authormodel.js");

exports.createauthor = async (req, res) => {
  try {
    const userdoc = await authormodel.create({
      name: req.body.name,
      age: req.body.age,
      dateofbirth: req.body.dateofbirth,
    });
    res.status(201).send({ data: userdoc, message: "Author Created !" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.getauthor = async (req, res) => {
  try {
    let all_authors = await authormodel.find({});
    res.send(all_authors);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
