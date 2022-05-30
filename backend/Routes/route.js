const router = require("express").Router();
const bookcontroller = require("../Controller/bookcontroller");
const usercontroller = require("../Controller/usercontroller");
const authorcontroller = require("../Controller/authorcontroller");
const middleware = require("../middleware/middleware");

//user registration and login
router.post("/login", usercontroller.login);
router.post("/register", usercontroller.register);

//author creation
router.post(
  "/createauthor",
  middleware.verifylogin,
  authorcontroller.createauthor
);

//book CRUD operations
router.post("/book/create/", middleware.verifylogin, bookcontroller.createbook);

router.post("/book/read/", middleware.verifylogin, bookcontroller.getbooks);

router.delete(
  "/book/delete/",
  middleware.verifylogin,
  bookcontroller.deletebook
);
// author read operation
router.post("/getauthors", authorcontroller.getauthor);

//verify token
router.post("/verifytoken", middleware.verifylogin, usercontroller.tokencheck);

module.exports = router;
