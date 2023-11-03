const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Course = require("../models/courseModel");
const Instructor = require("../models/instructorModel");
const Lecture = require("../models/lectureModel");
const Schedule = require("../models/scheduleModel");

const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({
    $and: [{ username: username }, { password: password }],
  });

  if (admin) {
    res.status(201).json({
      username: username,
    });
  } else {
    res.status(400);
    throw new Error("Account not found");
  }
});

const addCourse = async (req, res) => {
  const { name, level, description, image } = req.body;

  const courseExists = await Course.findOne({ name });

  if (courseExists) {
    res.status(400);
    throw new Error("Course already exists");
  }

  const course = await Course.create({
    name,
    level,
    description,
    image,
  });

  if (course) {
    res.status(201).json({
      _id: course._id,
      name: name,
      level: level,
      description: description,
      image: image,
    });
  } else {
    res.status(400);
    throw new Error("Course creation failed");
  }
};

const addInstructor = async (req, res) => {
  const { name, password } = req.body;

  const intructorExists = await Instructor.findOne({ name });

  if (intructorExists) {
    res.status(400);
    throw new Error("Instructor already exists");
  }

  const instructor = await Instructor.create({
    name,
    password,
  });

  if (instructor) {
    res.status(201).json({
      _id: instructor._id,
      name: name,
    });
  } else {
    res.status(400);
    throw new Error("Instructor insertion failed");
  }
};

const addLecture = async (req, res) => {
  try {
    const { courseName, instructorName, date } = req.body;

    const course = await Course.findOne({ name: courseName });
    const instructor = await Instructor.findOne({ name: instructorName });

    const schedule = await Schedule.findOne({
      $and: [{ instructorId: instructor._id }, { date: date }],
    });

    if (schedule) {
      return res.status(400).json({ error: "Cannot assign lecture" });
    }

    const lecture = await Lecture.create({
      courseId: course._id,
      instructorId: instructor._id,
      date: date,
    });

    const schedule1 = await Schedule.create({
      instructorId: instructor._id,
      date: date,
    });

    if (lecture) {
      res.status(201).json({
        _id: lecture._id,
        courseId: course._id,
        instructorId: instructor._id,
        date: date,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Lecture arrangement failed");
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.find({}).populate();

    res.status(201).json(course);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return;
  }
};

module.exports = { authAdmin, addCourse, addInstructor, addLecture, getCourse };
