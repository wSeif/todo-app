import React, { useEffect, useState } from "react";
import List from "./components/List.js";
import axios from "axios";
import { baseURL } from "./utils/constant.js";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addTask = () => {
    axios
      .post(`${baseURL}/save`, { task: input })
      .then((res) => {
        console.log("Task added:", res.data);
        setTasks([...tasks, res.data]);
        setInput("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then(() => {
        console.log("Task deleted:", id);
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const updateMode = (id, text) => {
    console.log("Editing task with id:", id);
    setInput(text); // Set input field value to the task text
    setUpdateId(id); // Set updateId to track which task is being edited
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, { task: input })
      .then((res) => {
        console.log("Task updated:", res.data);
        setUpdateId(null); // Clear updateId after update
        setInput(""); // Clear input field after update
        fetchTasks(); // Refresh tasks after update
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <main>
      <h1 className="title">toodooo</h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            handleDelete={handleDelete}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
