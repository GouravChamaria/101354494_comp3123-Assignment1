import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";

function ViewEmployee(props) {
  const { id } = useParams(); // Access the 'id' route parameter using useParams hook
  const [employeeData, setEmployeeData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/emp/employees?${id}`);
        if (response.data && response.data.status) {
          // Assuming the API response has a 'status' field indicating success
          console.log("Employee details:", response.data.data);
          setEmployeeData(response.data.data); // Set employeeData to the fetched data
        } else {
          setError("Error fetching employee details. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setError("Error fetching employee details. Please try again later.");
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(`/api/v1/emp/employees?${id}`);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting employee:", error.response.data.message);
      setError("Error deleting employee. Please try again later.");
    }
  };

  return (
    <div className="view-employee">
      {error && <div className="error-message">{error}</div>}
      {deleteSuccess ? (
        <div className="success-message">Employee deleted successfully!</div>
      ) : (
        <div>
          <h2>Employee Details</h2>
          <p>
            <strong>ID:</strong> {employeeData._id}
          </p>
          <p>
            <strong>First Name:</strong> {employeeData.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {employeeData.last_name}
          </p>
          <p>
            <strong>Email:</strong> {employeeData.email}
          </p>
          <p>
            <strong>Gender:</strong> {employeeData.gender}
          </p>
          <p>
            <strong>Salary:</strong> {employeeData.salary}
          </p>
          <button onClick={handleDeleteEmployee}>Delete Employee</button>
        </div>
      )}
    </div>
  );
}

export default ViewEmployee;
