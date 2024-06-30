const TaskModel = require("../models/TaskModels");

module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.saveTask = (req, res) => {
  const { task } = req.body;

  TaskModel.create({ task })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, msg: "Something went wrong" });
    });
};

module.exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, msg: "Something went wrong" });
    });
};

module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, msg: "Something went wrong" });
    });
};
