const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3001;
const dataFilePath = path.join(__dirname, "data.json"); // Define dataFilePath here

app.use(cors()); // Use the cors middleware
app.use(express.json());

app.get("/api/employee-list", (req, res) => {
  try {
    const existingData = fs.existsSync(dataFilePath)
      ? JSON.parse(fs.readFileSync(dataFilePath))
      : [];
    const employeeList = existingData.map((item) => ({
      employeeId: item.employeeId,
      employeeName: item.employeeName,
    }));
    console.log("Employee List:", employeeList); // Add this line
    res.json(employeeList);
  } catch (error) {
    console.error("Error fetching employee list:", error); // Log the error
    res
      .status(500)
      .json({ error: "An error occurred while fetching the employee list" });
  }
});

app.post("/api/employee", (req, res) => {
  const { employeeId, employeeName } = req.body;

  if (!employeeId || !employeeName) {
    return res
      .status(400)
      .json({ error: "Employee ID and Employee Name are required" });
  }

  try {
    const dataFilePath = path.join(__dirname, "data.json");
    const existingData = fs.existsSync(dataFilePath)
      ? JSON.parse(fs.readFileSync(dataFilePath))
      : [];

    const employeeExists = existingData.some(
      (item) => item.employeeId === employeeId
    );
    if (employeeExists) {
      return res.status(400).json({ error: "Employee ID already exists" });
    }

    existingData.push({ employeeId, employeeName, additionalData: [] });
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the employee" });
  }
});

app.post("/api/update-additional-data", (req, res) => {
  const { employeeId, additionalData } = req.body;

  if (!employeeId || !additionalData) {
    return res
      .status(400)
      .json({ error: "Employee ID and additional data are required" });
  }

  try {
    const dataFilePath = path.join(__dirname, "data.json");
    const existingData = fs.existsSync(dataFilePath)
      ? JSON.parse(fs.readFileSync(dataFilePath))
      : [];

    const employeeIndex = existingData.findIndex(
      (item) => item.employeeId === employeeId
    );

    if (employeeIndex !== -1) {
      const currentDate = new Date().toLocaleDateString();
      if (!existingData[employeeIndex].additionalData) {
        existingData[employeeIndex].additionalData = [];
      }
      existingData[employeeIndex].additionalData.push({
        date: currentDate,
        data: additionalData,
      });
      fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
      res.status(200).json({ message: "Additional data added successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating additional data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating additional data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
