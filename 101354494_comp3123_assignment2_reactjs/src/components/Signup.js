import React, { useState } from "react";
import axios from "../axios";
import "./Signup.css"; // Import your CSS file

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your signup API endpoint
      const response = await axios.post("/api/v1/user/signup", formData);

      // Handle the response, e.g., show a success message or redirect the user
      console.log("Signup successful:", response.data);
      // Redirect to login page after successful signup
      window.location.href = "/login";
    } catch (error) {
      // Handle signup error, e.g., display an error message
      console.error("Signup error:", error);
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
    <div className="signup-form">
      <h2>Signup</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <p></p>
        <label>Email : </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <p></p>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <p></p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
