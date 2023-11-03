const express = require("express");
const {
  authAdmin,
  addCourse,
  addInstructor,
  addLecture,
  getCourse,
} = require("../controllers/adminController.js");

const router = express.Router();

router.post("/", authAdmin);
router.post("/addCourse", addCourse);
router.post("/addInstructor", addInstructor);
router.post("/addLecture", addLecture);
router.route("/getCourse").get(getCourse);

module.exports = router;
