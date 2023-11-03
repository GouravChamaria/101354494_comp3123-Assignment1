import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <h1>Welcome to My React App</h1>
      <p>Explore the features of our application and enjoy your experience!</p>
    </div>
  );
}

export default Home;
