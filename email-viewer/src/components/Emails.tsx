import { useState } from "react";
import dummyData from "../data/dummyData.json";
import "./Emails.css";

const RECIPIENT = "Isabel Bowen";
const RECIPIENT_EMAIL = "sbtest.isabel@gmail.com";

const Emails = () => {
  const [activeEmails, setActiveEmails] = useState(dummyData.map(() => false));
  // const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleEmailHeaderClick = (index: number) => {
    setActiveEmails((prevActiveEmails) =>
      prevActiveEmails.map((active, i) => (i === index ? !active : false))
    );
  };

  return (
    <div id="email-container">
      <div className="unread-emails">
        <p>Unread</p>
        <span className="notification-badge">3</span>
      </div>

      {/* Display the JSON data */}
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
                  <input
                    type="checkbox"
                    name="emailSelect"
                    className="email-select"
                    onClick={(e) => e.stopPropagation()}
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
                        activeEmails[index] ? "fa-caret-down" : "fa-caret-right"
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
              {/* Display the email content dropdown when clicked */}
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
  );
};

export default Emails;
