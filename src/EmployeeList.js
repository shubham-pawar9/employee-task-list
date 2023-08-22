import React, { useState } from "react";

function EmployeeList({ employeeList, onOpenPopup, onOpenPopup2 }) {
  const [popup, setPopup] = useState(true);
  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.employeeName}</td>
              <td>
                <button
                  className="updateButton"
                  onClick={() => onOpenPopup(employee)}
                >
                  Update Task Here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
      <div className="taskDetails">
        <button onClick={(e) => onOpenPopup2(popup)}>See Task Details</button>
      </div>
    </div>
  );
}

export default EmployeeList;
