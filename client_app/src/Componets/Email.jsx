import {
  getEmails,
  deleteEmail,
  UpdateEmail,
  postEmails,
} from "../services/emailAPI";

import React, { useState, useEffect } from "react";

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
    // find getEmail for take email and _.id
    if (getEmail.length > 0) {
      const TakemailAndID = getEmail.find((items) => items);
      const { _id } = TakemailAndID;
      // now pass to function update for update email
      UpdateEmail(_id, e.target[0].value, SetGetEmail).then(() => {
        window.location.reload();
      });
    }

    console.log(getEmail, " in handel update email object");
  };
  const showInputUpdate = () => {
    SetShowUpdateInput(!showUpdateInput);
  };

  return (
    <div>
      {/* send email */}
      <form method="post" onSubmit={handelSubmitFormEmail}>
        <input type="text" placeholder="email@.com" />
        <button type="submit">send email</button>
      </form>
      {/* Show Email and Buttons Delete and Update */}
      {getEmail.length > 0 ? (
        getEmail.map((items) => {
          return (
            <div key={items._id}>
              {items.email}
              <button
                onClick={() => {
                  deleteEmail(items._id, SetGetEmail).then(() => {
                    window.location.reload();
                  });
                }}
              >
                Delete Email
              </button>
            </div>
          );
        })
      ) : (
        <h3>There is no email</h3>
      )}
      <button onClick={showInputUpdate}>set new email</button>
      {showUpdateInput && (
        <>
          {/* form for update email */}
          <form action="" method="post" onSubmit={handelUpdateEmail}>
            <input type="text" />
            <button type="submit">submit</button>
          </form>
        </>
      )}
    </div>
  );
};
