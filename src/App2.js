import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeList from "./EmployeeList";

function App() {
  const [message, setMessage] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

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
        setMessage("Employee ID submitted successfully");
        setEmployeeId("");
        setEmployeeName("");
        fetchEmployeeList();
      } else {
        setMessage("Failed to submit Employee ID");
      }
    } catch (error) {
      setMessage("Error submitting Employee ID");
      console.error("Error submitting Employee ID:", error);
    }
  };

  const fetchEmployeeList = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/employee-list");
      const data = await response.json();
      setEmployeeList(data);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  return (
    <div className="App">
      <h1>Employee ID Submission</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
            required
          />
        </label>
        <label>
          Employee Name:
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter Employee Name"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>

      <EmployeeList employeeList={employeeList} />
    </div>
  );
}

export default App;
