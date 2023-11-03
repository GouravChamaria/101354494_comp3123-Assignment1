import React, { useState } from "react";
import axios from "../axios";
import "./Login.css"; // Import your CSS file

function Login() {
  const [formData, setFormData] = useState({
    email: "", // Change 'username' to 'email'
    password: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/user/login", formData);
      console.log("response", response, formData);
      // Assuming the API returns a success status code, handle the successful login here
      console.log("Login successful:", response.data);
      // Redirect to dashboard or perform necessary actions after successful login
      window.location.href = "/employeelist";
    } catch (error) {
      // Handle login error and display error message
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>{" "}
          {/* Change 'username' to 'email' */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
