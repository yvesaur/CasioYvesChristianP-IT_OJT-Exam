import { useState } from "react";
import dummyData from "../data/dummyData.json";
import "./Emails-mobile.css";
import "./Emails.css";

const RECIPIENT = "Isabel Bowen";
const RECIPIENT_EMAIL = "sbtest.isabel@gmail.com";

const Emails = () => {
  // State for checking the current active emails
  const [activeEmails, setActiveEmails] = useState(dummyData.map(() => false));

  // State for checking the ticked emails
  const [deleteChecked, setDeleteChecked] = useState(
    dummyData.map(() => false)
  );

  // State for selecting all emails
  const [selectAllChecked, setselectAllChecked] = useState(false);

  // Toggles the active state of an email based on its index in the list.
  const handleEmailHeaderClick = (index: number) => {
    setActiveEmails((prevActiveEmails) =>
      prevActiveEmails.map((active, i) => (i === index ? !active : false))
    );
  };

  // Toggles the checked state of a delete checkbox based on its index in the list.
  const handleDeleteCheckboxClick = (index: number) => {
    setDeleteChecked((prevDeleteChecked) =>
      prevDeleteChecked.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  // Removes emails with checked delete checkboxes from dummyData, updates active emails, and resets checkbox states.
  const handleDeleteButton = () => {
    const updatedData = dummyData.filter((_, index) => !deleteChecked[index]);

    setActiveEmails((prevActiveEmails) =>
      prevActiveEmails.filter((_, index) => !deleteChecked[index])
    );

    dummyData.length = 0;
    dummyData.push(...updatedData);

    // Reset the deleteChecked array to match the new dummyData length
    setDeleteChecked(dummyData.map(() => false));

    setselectAllChecked(false);
  };

  // Toggles the checked state of all delete checkboxes and updates the select all checkbox state.
  const handleSelectAllClick = () => {
    setDeleteChecked((prevDeleteChecked) =>
      prevDeleteChecked.map(() => !prevDeleteChecked[0])
    );
    setselectAllChecked(!selectAllChecked);
  };

  return (
    <div>
      <div id="navbar-container">
        <div className="button-container">
          <input
            type="checkbox"
            name="selectAll"
            checked={selectAllChecked}
            className="select-all"
            onClick={handleSelectAllClick}
          />
          <button className="save-button">
            SAVE <span className="fa fa-save"></span>
          </button>
          <button className="filter-button">
            MANAGE FILTERS <span className="fa fa-filter"></span>
          </button>
          |
          <button className="delete-button" onClick={handleDeleteButton}>
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
      <div id="email-container">
        <div className="unread-emails">
          <p>Unread</p>
          <span className="notification-badge">3</span>
        </div>
        {/* Display the JSON data to the DOM i.e. The email content/metadata*/}
        {dummyData &&
          dummyData.map((email, index) => {
            return (
              <div id="email-card-container" key={email.id}>
                <div
                  className="email-header"
                  onClick={() => {
                    handleEmailHeaderClick(index);
                  }}
                >
                  <div>
                    <span className="fas fa-grip-vertical"></span>
                    <input
                      type="checkbox"
                      name="deleteCheckbox"
                      className="delete-checkbox"
                      checked={deleteChecked[index]}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCheckboxClick(index);
                      }}
                    />
                    <span className="status-badge"></span>
                    <time className="email-header-time">
                      <div>{email.date.split(" ")[0]} </div>
                      <div>{email.date.split(" ")[1].replace(",", "")}</div>
                    </time>
                    <span className="sender-badge">TA</span>

                    <div className="email-header-content">
                      <h3>{email.subject}</h3>
                      <p>
                        {email.sender_name} &lt;{email.sender_email}&gt; |{" "}
                        {email.date} at 3:41PM
                      </p>
                    </div>
                  </div>
                  <div>
                    {/* If Email[index] is active remove the header tags */}
                    {!activeEmails[index] && (
                      <div className="email-header-tags">
                        {(() => {
                          const emailTagList = email.tags.split(",");
                          return (
                            <>
                              <div className="tag">{emailTagList[0]}</div>
                              <div>
                                <span className="tag">{emailTagList[1]}</span>
                                <span className="tag tag-count">
                                  {emailTagList.length - 2}+
                                </span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}

                    <div className="email-dropdown-button">
                      <span>3 min.</span>
                      <span
                        className={`fas ${
                          activeEmails[index]
                            ? "fa-caret-down"
                            : "fa-caret-right"
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
                {/* Display the email content dropdown when clicked (active) */}
                {activeEmails[index] && (
                  <div className="email-card">
                    <div className="email-card-content">
                      <h4>{email.sender_name}</h4>
                      <p>{email.date} 3:41PM</p>
                      <br />
                      <p>{email.content}</p>
                      <br />
                      <div className="email-card-metadata">
                        <p>
                          From: <b>{email.sender_name}</b> &lt;
                          <a href="mailto:">{email.sender_email}</a>&gt;
                        </p>
                        <p>Date: {email.date} at 3:41PM</p>
                        <p>Subject: {email.subject}</p>
                        <p>
                          To: {RECIPIENT} &lt;
                          <a href="mailto:">{RECIPIENT_EMAIL}</a>&gt;
                        </p>
                      </div>
                    </div>
                    <div className="email-card-tags">
                      {email.tags.split(",").map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Emails;
