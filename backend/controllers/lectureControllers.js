const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Course = require("../models/courseModel");
const Instructor = require("../models/instructorModel");
const Lecture = require("../models/lectureModel");
const Schedule = require("../models/scheduleModel");

const getLectures = asyncHandler(async (req, res) => {
  try {
    const lectures = await Lecture.find({}).populate();

    res.status(201).json(lectures);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

const getInstLec = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;

    const instructor = await Instructor.findOne({ name: name });

    // Then, find all lectures associated with the instructor
    const lectures = await Lecture.find({
      instructorId: instructor._id,
    }).populate("courseId");

    // Extract the course IDs from the lectures
    const courseIds = lectures.map((lecture) => lecture.courseId);

    // Now, find all courses based on the extracted course IDs
    const courses = await Course.find({ _id: { $in: courseIds } }).populate();

    // Finally, send the courses as a JSON response
    res.status(201).json(courses);
  } catch (error) {
    console.error(error);
    throw new Error("Error");
    // res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = { getLectures, getInstLec };
