import { useEffect, useState } from "react";
import EmployeePopup from "./EmployeePopup";

const Abc = () => {
  const [id, setId] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((val) => setId(val));
  }, []);
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };
  return (
    <>
      {id &&
        id.map((value) => {
          return (
            <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{value.employeeName}</td>
                  <td>{value.employeeId}</td>
                  <td>
                    <button onClick={() => handleEmployeeClick(value)}>
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      {selectedEmployee && <EmployeePopup employee={selectedEmployee} />}
    </>
  );
};
export default Abc;
