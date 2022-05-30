const usermodel = require("../model/usermodel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(401)
        .send({ message: "Please enter username and password" });
    }
    const userdoc = await usermodel
      .findOne({ username: String(req.body.username).toLocaleLowerCase() })
      .lean();
    if (!userdoc) {
      return res
        .status(400)
        .send({ message: "There is No ID with this name !" });
    }
    if (!bcrypt.compareSync(req.body.password, userdoc.password)) {
      return res.status(401).send({ message: "Invalid Credentials !" });
    }
    const token = jwt.sign(userdoc, "secretkey");
    res.send({ message: "Login Successful !", token: token, data: userdoc });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.register = async (req, res) => {
  try {
    const userdoc = await usermodel.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    res.status(201).send({ data: userdoc, message: "User Created !" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.tokencheck = async (req, res) => {
  res.status(200).send({ message: "Token verified" });
};
