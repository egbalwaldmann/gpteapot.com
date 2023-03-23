import {
  getEmails,
  deleteEmail,
  UpdateEmail,
  postEmails,
} from "../../services/emailAPI";

import React, { useState, useEffect } from "react";
import "./email.css";
export const Email = () => {
  const [getEmail, SetGetEmail] = useState([]);
  const [showUpdateInput, SetShowUpdateInput] = useState(false);
  const [getValueUpdateInput, SetValueUpdateInput] = useState("");

  //* this useEffect take Emails from server

  useEffect(() => {
    getEmails(SetGetEmail);
  }, []);

  //*POST EMAIL
  const handelSubmitFormEmail = (e) => {
    e.preventDefault();
    let emailId;
    if (getEmail.length > 0) {
      emailId = getEmail.find((items) => items.id);
      console.log(emailId.id++, "emailId");
      emailId.id++;
    }
    const email = e.target[0].value;
    if (email) {
      postEmails(email, SetGetEmail, emailId ? emailId.id : 1).then(
        () => {
          window.location.reload();
        }
      );
    } else {
      console.log("we dont have any email"); //for validation email input
    }
  };

  //*UPDATE EMAIL
  const handelUpdateEmail = (e) => {
    e.preventDefault();
    if (getEmail.length > 0 && e.target[0].value) {
      const TakemailAndID = getEmail.find((items) => items);
      const { _id } = TakemailAndID;
      UpdateEmail(_id, e.target[0].value, SetGetEmail).then(() => {
        window.location.reload();
      });
    } else {
      console.log("sry you most be put new email");
    }

    console.log(getEmail, " in handel update email object");
  };
  const showInputUpdate = () => {
    SetShowUpdateInput(!showUpdateInput);
  };

  return (
    <div className="parent-Emailform">
      {/* send email */}
      <form method="post" onSubmit={handelSubmitFormEmail}>
        <input type="email" required placeholder="email@.com" />
        <button type="submit">send email</button>
      </form>
      {/* Show Email and Buttons Delete and Update */}
      {getEmail.length > 0 ? (
        getEmail.map((items) => {
          return (
            <section
              key={items._id}
              className="parenet-btnsAndEmailText"
            >
              <div className="EmailText">
                <h3>
                  Your Email : <span>{items.email}</span>{" "}
                </h3>
              </div>

              <div>
                <button
                  className="delete"
                  onClick={() => {
                    deleteEmail(items._id, SetGetEmail).then(() => {
                      window.location.reload();
                    });
                  }}
                >
                  Delete Email
                </button>
                <button onClick={showInputUpdate}>
                  set new email
                </button>
              </div>
            </section>
          );
        })
      ) : (
        <h3>There is no email</h3>
      )}

      {showUpdateInput && (
        <>
          {/* form for update email */}
          <form action="" method="post" onSubmit={handelUpdateEmail}>
            <input type="email" required />
            <button type="submit">submit</button>
          </form>
        </>
      )}
    </div>
  );
};
