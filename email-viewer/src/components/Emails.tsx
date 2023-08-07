import React from "react";
import "./Emails.css";

const Emails = () => {
  return (
    <div id="email-container">
      <div className="unread-emails">
        <p>Unread</p>
        <span className="notification-badge">3</span>
      </div>
    </div>
  );
};

export default Emails;
