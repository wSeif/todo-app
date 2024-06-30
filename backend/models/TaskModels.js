const mongoose = require("mongoose");
const TaskModel = require("../controllers/TaskControllers");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
