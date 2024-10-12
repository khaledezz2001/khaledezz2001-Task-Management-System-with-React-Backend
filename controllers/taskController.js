const Task = require("../models/Task");

// Create a task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const userId = req.user.userId;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user: userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};

// Get tasks with filters
exports.getTasks = async (req, res) => {
  const userId = req.user.userId;
  const { status, priority } = req.query;
  let filter = { user: userId };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};
