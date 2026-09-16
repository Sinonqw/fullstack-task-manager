const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRouter = require("./routes/taskRouter");
const dotenv = require("dotenv");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/tasks", taskRouter);

dotenv.config();


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
