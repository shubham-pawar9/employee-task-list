import React, { useState } from "react";

function EmployeeTaskList({ employeeList, onClose }) {
  const [employeeId, setEmployeeId] = useState("");
  const [selectedEmployeeTask, setSelectedEmployeeTask] = useState("");
  const handleTaskList = () => {
    // employeeList &&
    //   employeeList.map((value) => {
    //     if (employeeId == value.employeeId) {
    //       return setSelectedEmployeeTask(value.additionalData);
    //     } else {
    //       alert("Id not in Employee List, First Add Employee ID")
    //     }
    //   });
    const foundEmployee = employeeList.find(
      (value) => value.employeeId === employeeId
    );
    console.log(foundEmployee);
    if (foundEmployee) {
      setSelectedEmployeeTask(foundEmployee.additionalData);
    } else {
      alert("Id not in Employee List, First Add Employee ID");
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
            <th>Date</th>
            <th>Task</th>
          </thead>
          <tbody>
            {selectedEmployeeTask &&
              selectedEmployeeTask.map((data) => {
                return (
                  <tr>
                    <td>{data.date}</td>
                    <td>{data.data}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTaskList;
