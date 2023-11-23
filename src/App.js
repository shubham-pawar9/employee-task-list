import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeList from "./EmployeeList";
import EmployeePopup from "./EmployeePopup";
import EmployeeTaskList from "./EmployeeTaskList";
import data from "./data.json";

function App() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeTaskDetails, setEmployeeTaskDetails] = useState(data);
  const [taskPopup, setTaskPopUp] = useState(null);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

  const fetchEmployeeList = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/employee-list`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeList(data);
      } else {
        console.log("Error fetching employee list");
      }
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, [apiBaseUrl]); // Add apiBaseUrl as a dependency

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!employeeId || !employeeName) {
      alert("Both Employee ID and Employee Name are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, employeeName }),
      });

      if (response.ok) {
        setEmployeeId("");
        setEmployeeName("");
        fetchEmployeeList();
      } else {
        // Handle errors as needed
        alert("employee Id alreay Added in list");
        console.log("Failed to submit Employee ID");
      }
    } catch (error) {
      console.error("Error submitting Employee ID:", error);
    }
  };

  const handleOpenPopup = (employee) => {
    setSelectedEmployee(employee);
  };
  const handleOpenPopup2 = (popup) => {
    console.log(popup);
    setTaskPopUp(popup);
  };
  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };
  const handleClosePopup2 = () => {
    setTaskPopUp(null);
  };

  return (
    <div className="App">
      <h1>Employees Task Update System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
        <label>
          Employee Name:
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* <p>{message}</p> */}
      <EmployeeList
        employeeList={employeeList}
        onOpenPopup={handleOpenPopup}
        onOpenPopup2={handleOpenPopup2}
      />
      {selectedEmployee && (
        <EmployeePopup employee={selectedEmployee} onClose={handleClosePopup} />
      )}

      {taskPopup && (
        <EmployeeTaskList
          employeeList={employeeTaskDetails}
          onClose={handleClosePopup2}
        />
      )}
    </div>
  );
}

export default App;
