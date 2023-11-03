const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamp: true }
);

const courseSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  image: String,
});

const instructorSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const lectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  date: String,
});

const scheduleSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  date: Date,
});

// const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Instructor = mongoose.model("Instructor", instructorSchema);
const Lecture = mongoose.model("Lecture", lectureSchema);
const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Course, Instructor, Lecture, Schedule };
