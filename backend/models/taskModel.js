const mogoose = require("mongoose");
const taskSchema = new mogoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mogoose.model("Tasks", taskSchema);

module.exports = Task;
