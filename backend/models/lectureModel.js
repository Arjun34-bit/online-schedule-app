const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  date: String,
});
const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
