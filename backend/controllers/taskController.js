const Task = require("../models/taskModel");

// GET
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
};

// POST
const createTask = async (req, res) => {
  const { title, description, day } = req.body;

  const task = new Task({
    title,
    description,
    day,
  });

  await task.save();

  res.send(task);
};

// PUT
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, day } = req.body;
  
  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, completed, day },
    { new: true },
  );

  res.send(task);
};

// DELETE
const deleteTask = async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);

  res.send({ message: "Task deleted" });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
