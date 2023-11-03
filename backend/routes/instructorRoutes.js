const express = require("express");
const {
  authInst,
  getLectures,
  getInstructors,
} = require("../controllers/instructorController");

const router = express.Router();

router.post("/", authInst);
// router.post("/getLectures/:id", getLectures);
router.get("/getInstructors", getInstructors);

module.exports = router;
