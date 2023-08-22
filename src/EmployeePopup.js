import React, { useState } from "react";

function EmployeePopup({ employee, onClose }) {
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = async () => {
    if (!additionalInfo) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/update-additional-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: employee.employeeId,
            additionalData: additionalInfo,
          }),
        }
      );

      if (response.ok) {
        console.log("Additional data added successfully");
        onClose(); // Close the popup after successful submission
      } else {
        console.log("Failed to add additional data");
      }
    } catch (error) {
      console.error("Error adding additional data:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span>Id- {employee.employeeId}</span>
        <h2>Add Your New Task</h2>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
        <br></br>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmployeePopup;
