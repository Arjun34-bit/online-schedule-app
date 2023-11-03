const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
