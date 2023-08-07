import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div id="navbar-container">
      <div className="button-container">
        <input type="checkbox" name="" id="" />
        <button>SAVE</button>
        <button>MANAGE FILTERS</button>|<button>DELETE</button>
      </div>
      <div className="pagination">
        <span>
          <a href="#">&lt;</a>
        </span>
        <span> 50 of 150 </span>
        <span>
          <a href="#">&gt;</a>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
