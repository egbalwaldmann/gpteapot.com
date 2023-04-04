const express = require("express"); // 🚀 Import express | 🚀 Express importieren
const router = express.Router(); // 🛣️ Create a new router object | 🛣️ Neues Router-Objekt erstellen
router.use(express.json()); // 📦 Add JSON parsing middleware | 📦 JSON-Parsing-Middleware hinzufügen

const { emailModel } = require("../model/userEmail"); // 📝 Import emailModel from userEmail model file | 📝 emailModel aus userEmail Model-Datei importieren

//*Post Email
// POST /postEmail 📮: Adds a new email to the database. | 📮: Fügt eine neue E-Mail in die Datenbank ein.
// Creates a new email object ✉️. | ✉️: Erstellt ein neues E-Mail-Objekt.
// Checks if the email already exists in the database; if it does, sends an error message ⚠️. | ⚠️: Überprüft, ob die E-Mail bereits in der Datenbank vorhanden ist; wenn ja, wird eine Fehlermeldung gesendet.
// If the email is unique, saves it to the database and returns a success message ✅. | ✅: Wenn die E-Mail eindeutig ist, wird sie in der Datenbank gespeichert und eine Erfolgsmeldung zurückgegeben.
router.post("/postEmail", async (req, res) => { // Define an asynchronous route handler for POST requests to "/postEmail"
  try { // Start a try block to catch any errors during execution
    let newEmail = new emailModel({ // Create a new instance of the emailModel
      id: req.body.id, // Set the id property from the request body
      email: req.body.email, // Set the email property from the request body
    });

    const foundEmail = await emailModel.find(); // Fetch all the email records from the database
    const emails = foundEmail.find((items) => { // Find an email in the foundEmail array that matches the request's email
      return items.email === req.body.email; // Return true if the email from the array matches the email from the request
    });
    console.log(emails); // Log the found email (if any) to the console

    newEmail = await newEmail.save(); // Save the new email instance to the database

    if (emails) { // Check if the email was found in the database
      res.status(404).send("We have this email, try another."); // If found, respond with a 404 status and an error message
      return null; // Exit the route handler early
    }

    console.log(emails); // Log the found email (if any) to the console again
    res.status(200).send(newEmail); // If the email is unique, respond with a 200 status and the new email object
  } catch (ex) { // Catch any errors that occur during execution
    console.log(ex); // Log the error to the console
    res.send(ex.message); // Respond with the error message
  }
});

//* Get Email
// GET / 📥: Fetches the most recent email from the database. | 📥: Ruft die neueste E-Mail aus der Datenbank ab.
// Retrieves the latest email by sorting by id in descending order and limiting the result to 1 🔍. | 🔍: Ermittelt die neueste E-Mail, indem die Ergebnisse nach ID absteigend sortiert und auf 1 begrenzt werden.
// Sends the email data as a response 📤. | 📤: Sendet die E-Mail-Daten als Antwort.
router.get("/", async (req, res) => {
  try {
    const emails = await emailModel.find().sort({ id: -1 }).limit(1);
    return res.send(emails);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//*Deleted Email
// DELETE /deleteEmail/:id 🗑️: Deletes an email with the given id from the database. | 🗑️: Löscht eine E-Mail mit der angegebenen ID aus der Datenbank.
// Finds and removes the email with the specified id 🔎🔧. | 🔎🔧: Findet und entfernt die E-Mail mit der angegebenen ID.
// If the email is not found, sends an error message ⚠️. | ⚠️: Wenn die E-Mail nicht gefunden wird, wird eine Fehlermeldung gesendet.
// If the email is successfully deleted, sends the deleted email data as a response 📤. | 📤: Sendet die gelöschten E-Mail-Daten als Antwort.
router.delete("/deleteEmail/:id", async (req, res) => {
  try {
    const emails = await emailModel.findByIdAndRemove(req.params.id);
    if (!emails) {
      return res.status(404).send("We can not find this id.");
    }
    res.send(emails);
  } catch (ex) {
    res.send(ex.message);
  }
});


//*Update Email
// PUT /update/:id 🔄: Updates the email with the given id. | 🔄: Aktualisiert die E-Mail mit der angegebenen ID.
// Finds the email with the specified id and updates its data 🔎🛠️. | 🔎🛠️: Findet die E-Mail mit der angegebenen ID und aktualisiert deren Daten.
// If the email is not found, sends an error message ⚠️. | ⚠️: Wenn die E-Mail nicht gefunden wird, wird eine Fehlermeldung gesendet.
// If the email is successfully updated, sends the updated email data as a response 📤. | 📤: Sendet die aktualisierten E-Mail-Daten als Antwort.
router.put("/update/:id", async (req, res) => { // Define an asynchronous route handler for PUT requests to "/update/:id"
  try { // Start a try block to catch any errors during execution
    const newEmail = await emailModel.findByIdAndUpdate( // Find and update the email with the specified id
      req.params.id, // Get the id from the request parameters
      { // Provide the new data for the email
        id: req.body.id, // Set the id property from the request body
        email: req.body.email, // Set the email property from the request body
      },
      { // Options for the update operation
        new: true, // Return the updated email object instead of the original
      }
    );
    if (!newEmail) { // Check if the email was found and updated
      return res.status(404).send("We can not find this id."); // If not found, respond with a 404 status and an error message
    }
    res.send(newEmail); // If the email is updated, respond with the updated email object
  } catch (ex) { // Catch any errors that occur during execution
    res.send(ex.message); // Respond with the error message
  }
});

// 🔄: Exports the router object so that it can be used in other parts of the application. | 🔄: Exportiert das Router-Objekt, damit es in anderen Teilen der Anwendung verwendet werden kann.
module.exports = router;
