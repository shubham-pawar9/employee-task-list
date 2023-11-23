import React, { useState } from "react";

function EmployeeTaskList({ onClose }) {
  const [employeeId, setEmployeeId] = useState("");
  const [selectedEmployeeTask, setSelectedEmployeeTask] = useState([]);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

  const handleTaskList = async () => {
    const trimmedEmployeeId = employeeId.trim();

    if (!trimmedEmployeeId) {
      alert("Please enter a valid Employee ID");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/employee-list`);

      if (response.ok) {
        const data = await response.json();
        const foundEmployee = data.find(
          (value) => value.employeeId === parseInt(trimmedEmployeeId)
        );

        if (foundEmployee) {
          setSelectedEmployeeTask(foundEmployee.additionalData);
        } else {
          alert("Employee not found in the Employee List");
        }
      } else {
        console.log("Error fetching employee list");
      }
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  return (
    <div className="popupTaskList">
      <input
        type="number"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <button className="taskSubmit" onClick={handleTaskList}>
        Submit
      </button>
      <button className="close" onClick={onClose}>
        X
      </button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {selectedEmployeeTask.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTaskList;
