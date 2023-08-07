import React from "react";
import "./App.css";
import Emails from "./components/Emails";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Emails></Emails>
    </div>
  );
};

export default App;
