const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");

exports.verifylogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "There is no token" });
  }
  try {
    var decode = jwt.verify(token, "secretkey");
    var userdoc = await usermodel.findOne({ _id: decode._id });
    if (userdoc) {
      res.locals.userdoc = userdoc;
      next();
    } else {
      res.status(401).send({ message: "This token nit valid" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
