import React, { useState } from "react";
import axios from "../axios";

const allowedGenders = ["Male", "Female", "Other"];

function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "gender" && !allowedGenders.includes(value)) {
      setErrors({
        ...errors,
        gender: "Gender must be 'Male', 'Female', or 'Other'",
      });
    } else {
      setErrors({
        ...errors,
        gender: "",
      });
    }

    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!employeeData.first_name) {
      errors.first_name = "First name is required";
      isValid = false;
    }

    if (!employeeData.last_name) {
      errors.last_name = "Last name is required";
      isValid = false;
    }

    if (!employeeData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!employeeData.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    } else if (!allowedGenders.includes(employeeData.gender)) {
      errors.gender = "Gender must be 'Male', 'Female', or 'Other'";
      isValid = false;
    }

    if (!employeeData.salary) {
      errors.salary = "Salary is required";
      isValid = false;
    } else if (isNaN(employeeData.salary) || employeeData.salary <= 0) {
      errors.salary = "Invalid salary amount";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  async function handleAddEmployee() {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/v1/emp/employees", employeeData);

      if (response && response.data) {
        console.log("Employee added successfully:", response.data);
        // Handle success (e.g., show a success message)
      } else {
        console.error("Invalid response format:", response);
        // Handle unexpected response format
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      // Handle error (e.g., show an error message)
    }
  }

  return (
    <div className="add-employee-form">
      <div className="form-group">
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={employeeData.first_name}
          onChange={handleInputChange}
          required
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
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
}

export default AddEmployee;
