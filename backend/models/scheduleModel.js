const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  date: Date,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
