// 🌟 API Functions for the CRUD functionality 🌟
// 🌐 Funktionen definieren, um mit der Server-API zu interagieren, einschließlich Abrufen, Posten, Löschen und Aktualisieren von E-Mails. 🌐

// 📍 Defining the base URL for the server. 📍
// 📍 Basis-URL für den Server definieren. 📍
const url = "https://server.gpteapot.com";


// 💻 getEmails function 💻
// 🔍 E-Mail-Daten vom Server mit einer asynchronen Funktion abrufen. 🔍
// getEmails function: This function retrieves a list of emails from the server using an asynchronous fetch request. The response is expected to be in JSON format. Once the response is received and converted to JSON, it calls the SetGetEmail function to update the email state in the component.
// getEmails-Funktion: Diese Funktion holt eine Liste von E-Mails vom Server mit einer asynchronen Fetch-Anfrage ab. Die Antwort wird in JSON-Format erwartet. Sobald die Antwort empfangen und in JSON konvertiert wurde, ruft sie die SetGetEmail-Funktion auf, um den E-Mail-Zustand in der Komponente zu aktualisieren.
export const getEmails = async (SetGetEmail) => {
  // ⏳ Await the response from the fetch request. ⏳
  // ⏳ Warten auf die Antwort der Fetch-Anfrage. ⏳
  const getEmail = await fetch(url);
  
  // 📋 Await the response to be converted to JSON format. 📋
  // 📋 Warten, bis die Antwort in JSON-Format konvertiert ist. 📋
  const email = await getEmail.json();
  
  // 🗂️ SetGetEmail - Funktion zum Aktualisieren des E-Mail-Zustands in der Komponente. 🗂️
  SetGetEmail(email);
};

// 💻 postEmails function 💻
// 📮 E-Mail-Daten an den Server senden, um einen neuen E-Mail-Eintrag zu erstellen. 📮
// postEmails function: This function is used to create a new email entry on the server. It sends a POST request with the email data (id and email) to the server. After receiving the response from the server, it calls the SetGetEmail function to update the email state.
// postEmails-Funktion: Diese Funktion wird verwendet, um einen neuen E-Mail-Eintrag auf dem Server zu erstellen. Es sendet eine POST-Anfrage mit den E-Mail-Daten (ID und E-Mail) an den Server. Nach dem Empfang der Antwort vom Server ruft es die SetGetEmail-Funktion auf, um den E-Mail-Zustand zu aktualisieren.
export const postEmails = async (email, SetGetEmail, id) => {
  // ✉️ Send a POST request with the email data. ✉️
  // ✉️ POST-Anfrage mit den E-Mail-Daten senden. ✉️
  const sending = await fetch(`${url}/postEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      email: email,
    }),
  });
  
  // 📥 Await the response from the POST request. 📥
  // 📥 Warten auf die Antwort der POST-Anfrage. 📥
  const takeNewEmail = await sending.json();

  // 🧾 SetGetEmail - Funktion zum Aktualisieren des E-Mail-Zustands nach erfolgreichem Posten. 🧾
  SetGetEmail(takeNewEmail);
};

// 💻 deleteEmail function 💻
// 🗑️ E-Mail-Eintrag vom Server mit der angegebenen ID löschen. 🗑️
// deleteEmail function: This function deletes an email entry from the server using the given email id. It sends a DELETE request to the server with the id. Once the deletion is successful, it calls the SetGetEmail function to update the email state in the component.
// deleteEmail-Funktion: Diese Funktion löscht einen E-Mail-Eintrag vom Server mit der angegebenen E-Mail-ID. Es sendet eine DELETE-Anfrage an den Server mit der ID. Sobald die Löschung erfolgreich ist, ruft es die SetGetEmail-Funktion auf, um den E-Mail-Zustand in der Komponente zu aktualisieren.
export const deleteEmail = async (id, SetGetEmail) => {
  // 🚮 Send a DELETE request to the server with the given ID. 🚮
  // 🚮 DELETE-Anfrage an den Server mit der angegebenen ID senden. 🚮
  const data = await fetch(`${url}/deleteEmail/${id}`, {
    method: "DELETE",
  });
  
  // 🔄 SetGetEmail - Funktion zum Aktualisieren des E-Mail-Zustands nach erfolgreichem Löschen. 🔄
  SetGetEmail(data);
};

// 💻 UpdateEmail function 💻
// 🔧 E-Mail-Eintrag auf dem Server mit der angegebenen ID und E-Mail aktualisieren. 🔧
// UpdateEmail function: This function updates an existing email entry on the server using the given email id and email data. It sends a PUT request with the updated email data. After receiving the updated email data from the server, it calls the SetGetEmail function to update the email state in the component.
// UpdateEmail-Funktion: Diese Funktion aktualisiert einen vorhandenen E-Mail-Eintrag auf dem Server mit der angegebenen E-Mail-ID und den E-Mail-Daten. Es sendet eine PUT-Anfrage mit den aktualisierten E-Mail-Daten. Nach dem Empfang der aktualisierten E-Mail-Daten vom Server ruft es die SetGetEmail-Funktion auf, um den E-Mail-Zustand in der Komponente zu aktualisieren.
export const UpdateEmail = async (id, email, SetGetEmail) => {
  // 🖨️ Log email data for debugging purposes. 🖨️
  // 🖨️ E-Mail-Daten zur Fehlerbehebung protokollierieren. 🖨️
  console.log(email, "*");
  
  // 🛠️ Send a PUT request to update the email entry on the server. 🛠️
  // 🛠️ PUT-Anfrage senden, um den E-Mail-Eintrag auf dem Server zu aktualisieren. 🛠️
  const updatedata = await fetch(
    `https://server.gpteapot.com/update/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    }
  );
  
  // 📬 Await the response from the PUT request. 📬
  // 📬 Warten auf die Antwort der PUT-Anfrage. 📬
  const updateEmail = await updatedata.json();
  
  // 📟 Log the updated email data for debugging purposes. 📟
  // 📟 Aktualisierte E-Mail-Daten zur Fehlerbehebung protokollieren. 📟
  console.log(updateEmail, " in api update email function");
  
  // 🆕 SetGetEmail - Funktion zum Aktualisieren des E-Mail-Zustands nach erfolgreichem Update. 🆕
  await SetGetEmail(updateEmail);
};
