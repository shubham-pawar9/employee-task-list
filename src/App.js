import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeList from "./EmployeeList";
import EmployeePopup from "./EmployeePopup";
import EmployeeTaskList from "./EmployeeTaskList";
function App() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeTaskDetails, setEmployeeTaskDetails] = useState(null);
  const [taskPopup, setTaskPopUp] = useState(null);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((val) => setEmployeeTaskDetails(val));
  }, []);

  const fetchEmployeeList = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/employee-list");
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
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
  }, []);

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
        // setMessage("Employee ID submitted successfully");
        setEmployeeId("");
        setEmployeeName("");
        fetchEmployeeList();
      } else {
        const responseData = await response.json();
        if (response.status === 400) {
          alert(responseData.error); // Display error message if employee ID already exists
        } else {
          setMessage("Failed to submit Employee ID");
        }
      }
    } catch (error) {
      setMessage("Error submitting Employee ID");
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
