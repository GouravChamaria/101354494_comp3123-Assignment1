import React, { useEffect } from "react";

function Logout(props) {
  useEffect(() => {
    // Clear user session (e.g., remove user data from localStorage)
    localStorage.removeItem("userId");
    // Redirect to the login page after logout
    props.history.push("/login");
  }, []);

  return (
    <div className="logout">
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
