const express = require("express");
const app = express();
const mongoose = require("mongoose");
const LogisticsModel = require("./models/Logistics");
require("dotenv").config();
const cors = require("cors"); //connects API to react

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECT);

app.get("/fetchAll", async (req, res) => {

    const projection = {
        "ID": 1,
        "OldSchedule": 1,
        "NewSchedule": 1,
        "Code": 1,
        "Semester": 1,
        "Department": 1,
        "Time": 1,
        "MasterCalendar": 1,
        "Files": 1
    }

    try {
      
      const result = await LogisticsModel.find({}, projection);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

/* This get request returns all rows that matches the conditions in req. */
app.get("/locations/:category", async (req, res) => {
    const projection = {
      "ID": 1,
      "OldSchedule": 1,
      "NewSchedule": 1,
      "Code": 1,
      "Semester": 1,
      "Department": 1,
      "Time": 1,
      "MasterCalendar": 1,
      "Files": 1
  }

    try {
        const result = await LogisticsModel.find(req.body, projection);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

//Example of req.body
// {
//     "Category": "Restaurant",
//     "Pork Free": 1
// }

app.post("/addLogistics", async (req, res) => {
  // Extract data from the request body
  const { ID, OldSchedule, NewSchedule, Code, Semester, Department, Time, MasterCalendar, Files, ClassWebsite, CourseWebsite, Year } = req.body;
  console.log("PASS")
  // Create a new document

  const newLogistic = new LogisticsModel({
      ID,
      OldSchedule,
      NewSchedule,
      Code,
      Semester,
      Department,
      Time,
      MasterCalendar,
      Files,
      ClassWebsite,
      CourseWebsite,
      Year
  });

  try {
      // Save the document to the database
      await newLogistic.save();

      // Respond with a success message
      res.json({ message: "Logistic added successfully!" });
  } catch (err) {
      // Respond with an error message
      console.log(err);
      res.status(500).json({ error: "Failed to add logistical data", details: err });
  }
});

app.get("/getData/:id", async (req, res) => {
  const id = req.params.id;  // Extract ID from request parameters

  try {
      // Query the database for documents with the specified ID
      const data = await LogisticsModel.find({ ID: id });

      if (!data.length) {
          // If no data was found with the given ID
          res.status(404).json({ error: "No data found for the provided ID" });
      } else {
          // Respond with the found data
          res.json(data);
      }
  } catch (err) {
      // Handle any errors that occurred while querying
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve data", details: err });
  }
});

app.listen(3001, () => {
    console.log("server is running");
})
