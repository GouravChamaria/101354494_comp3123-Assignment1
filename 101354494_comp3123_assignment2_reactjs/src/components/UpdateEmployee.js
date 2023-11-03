import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

function UpdateEmployee() {
  const { id } = useParams();

  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    salary: "",
  });

  const [errors, setErrors] = useState({}); // Define errors state

  useEffect(() => {
    // Fetch employee data by ID and update the state
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`/api/v1/emp/employees/${id}`);
        setEmployeeData(response.data); // Assuming the API response provides employee data
      } catch (error) {
        // Handle error
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData(); // Call the function to fetch employee data on component mount
  }, [id]);

  const handleUpdateEmployee = async () => {
    // Validate input fields
    const validationErrors = {};

    if (!employeeData.first_name) {
      validationErrors.first_name = "First name is required";
    }
    // Validate other fields similarly

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, update the errors state and return
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors if the form is now valid
    setErrors({});

    try {
      // Make API call to update employee data using employeeData state
      const response = await axios.put(
        `/api/v1/emp/employees/${id}`,
        employeeData
      );
      // Handle successful response (e.g., show success message, redirect user)
      console.log("Employee updated successfully:", response.data);
    } catch (error) {
      // Handle error and set errors state if necessary
      console.error("Error updating employee:", error);
      // You can set errors state based on the error response if needed
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  return (
    <div className="update-employee-form">
      <h2>Update Employee</h2>
      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={employeeData.first_name}
          onChange={handleInputChange}
        />
        {errors.first_name && (
          <div className="error-message">{errors.first_name}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={employeeData.last_name}
          onChange={handleInputChange}
          required
        />
        {errors.last_name && (
          <div className="error-message">{errors.last_name}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={employeeData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={employeeData.gender}
          onChange={handleInputChange}
          required
        />
        {errors.gender && <div className="error-message">{errors.gender}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={employeeData.salary}
          onChange={handleInputChange}
          required
        />
        {errors.salary && <div className="error-message">{errors.salary}</div>}
      </div>
      <button onClick={handleUpdateEmployee}>Update Employee</button>
    </div>
  );
}

export default UpdateEmployee;
