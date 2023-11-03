const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Course = require("../models/courseModel");
const Instructor = require("../models/instructorModel");
const Lecture = require("../models/lectureModel");
const Schedule = require("../models/scheduleModel");

const authInst = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const instructor = await Instructor.findOne({
    $and: [{ name: username }, { password: password }],
  });

  if (instructor) {
    res.status(201).json({
      username: username,
    });
  } else {
    res.status(400);
    throw new Error("Account not found");
  }
});

// const getLectures = asyncHandler(async (res, req) => {
//   const { name } = req.params;

//   const instructor = await Instructor.findOne({ name: name });

//   const lecture = await Lecture.find({ instructorId: instructor._id });

//   const course = await Course.find({ _id: lecture.course._id });

//   if (course) {
//     res.status(201).json({
//       _id: course._id,
//       name: name,
//       level: level,
//       description: description,
//       image: image,
//     });
//   }
// });

const getInstructors = asyncHandler(async (req, res) => {
  try {
    const instructor = await Instructor.find({})
      .populate("_id")
      .populate("name");

    res.status(201).json(instructor);
  } catch (error) {}
});

module.exports = { authInst, getInstructors };
