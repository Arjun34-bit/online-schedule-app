const express = require("express");
const { getLectures } = require("../controllers/lectureControllers");
const { getInstLec } = require("../controllers/lectureControllers");
const router = express.Router();

router.get("/", getLectures);
router.route("/instructorsLec/:name").get(getInstLec);

module.exports = router;
