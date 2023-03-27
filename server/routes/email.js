const express = require("express"); // 🚀 Import express
const router = express.Router(); // 🛣️ Create a new router object
router.use(express.json()); // 📦 Add JSON parsing middleware

const { emailModel } = require("../model/userEmail"); // 📝 Import emailModel from userEmail model file

//*Post Email
// POST /postEmail 📮: Adds a new email to the database.
// Creates a new email object ✉️.
// Checks if the email already exists in the database; if it does, sends an error message ⚠️.
// If the email is unique, saves it to the database and returns a success message ✅.
router.post("/postEmail", async (req, res) => {
  try {
    let newEmail = new emailModel({
      id: req.body.id,
      email: req.body.email,
    });

    const foundEmail = await emailModel.find();
    const emails = foundEmail.find((items) => {
      return items.email === req.body.email;
    });
    console.log(emails);
    newEmail = await newEmail.save();

    if (emails) {
      res.status(404).send("We have this email, try another.");
      return null;
    }

    console.log(emails);
    res.status(200).send(newEmail);
  } catch (ex) {
    console.log(ex);
    res.send(ex.message);
  }
});
//* Get Email
// GET / 📥: Fetches the most recent email from the database.
// Retrieves the latest email by sorting by id in descending order and limiting the result to 1 🔍.
// Sends the email data as a response 📤.
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
// DELETE /deleteEmail/:id 🗑️: Deletes an email with the given id from the database.
// Finds and removes the email with the specified id 🔎🔧.
// If the email is not found, sends an error message ⚠️.
// If the email is successfully deleted, sends the deleted email data as a response 📤.
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
// PUT /update/:id 🔄: Updates the email with the given id.
// Finds the email with the specified id and updates its data 🔎🛠️.
// If the email is not found, sends an error message ⚠️.
// If the email is successfully updated, sends the updated email data as a response 📤.
router.put("/update/:id", async (req, res) => {
  try {
    const newEmail = await emailModel.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        email: req.body.email,
      },
      {
        new: true,
      }
    );
    if (!newEmail) {
      return res.status(404).send("We can not find this id.");
    }
    res.send(newEmail);
  } catch (ex) {
    res.send(ex.message);
  }
});
// 🔄: Exports the router object so that it can be used in other parts of the application.
module.exports = router;
