import React from "react";

function Dashboard() {
  // Check if user is logged in by retrieving userId from local storage
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // User is not logged in, show a message or redirect to the login page
    return <h2>Please log in to access the dashboard.</h2>;
  }

  // User is logged in, render the dashboard content
  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      {/* Dashboard content */}
    </div>
  );
}

export default Dashboard;
