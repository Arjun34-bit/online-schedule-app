const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const adminRoutes = require("./routes/adminRoutes.js");
const instructorRoutes = require("./routes/instructorRoutes.js");
const lectureRoutes = require("./routes/lectureRoutes.js");

dotenv.config(); //configuring the dotenv package.
connectDB();
const app = express(); //creating instance for express.
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/instructor", instructorRoutes);
app.use("/lectures", lectureRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});
// app.use("api/instructor", instructorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
