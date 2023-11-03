// src/components/EmployeeList.js
import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./EmployeeList.css"; // Import your CSS file

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/v1/emp/employees");
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-list">
      <h2>All Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name} - {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
