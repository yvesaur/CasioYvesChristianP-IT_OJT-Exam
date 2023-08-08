import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div id="navbar-container">
      <div className="button-container">
        <input type="checkbox" name="selectAll" className="select-all" />
        <button className="save-button">
          SAVE <span className="fa fa-save"></span>
        </button>
        <button className="filter-button">
          MANAGE FILTERS <span className="fa fa-filter"></span>
        </button>
        |
        <button className="delete-button">
          DELETE <span className="fas fa-trash"></span>
        </button>
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
