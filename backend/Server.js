// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const routes = require("./route/TaskRoute");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 5011;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

app.use("/api", routes);
