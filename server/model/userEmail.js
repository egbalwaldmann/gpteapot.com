const e = require("express"); // 📦 Import Express library (like a train station connecting trains 🚆)
const mongoose = require("mongoose"); // 📦 Import Mongoose library (like a language guide for talking to a database 🗣️)

// 📝 Define the emailSchema for the MongoDB collection (like a blueprint for a building 🏗️)
const emailSchema = new mongoose.Schema({
  id: {
    type: Number, // 🔢 Define the 'id' field as a Number (like a house number 🏠)
    required: true, // ⚠️ The 'id' field is required (a must-have, like a door in a house 🚪)
  },
  email: {
    type: String, // 📧 Define the 'email' field as a String (like an address on an envelope ✉️)
    required: true, // ⚠️ The 'email' field is required (a must-have, like a stamp on an envelope 📬)
  },
});

// 🎛️ Create the emailModel using the emailSchema (like using the blueprint to build a house 🏠)
const emailModel = mongoose.model("useremails", emailSchema);

// 🚫 Uncomment the following code block to save a new email entry
// function saveAgin() {
//   const d = new emailModel({
//     id: 3,
//     email: "egbal@waldmann.dev",
//   });
//   d.save(); // 💾 Save the email entry to the database (like storing an item in a warehouse 🏭)
// }
// saveAgin(); // 🔁 Call the saveAgin function (like pressing a button to start a machine 🖲️)

// 📤 Export the emailModel for use in other modules (like offering a product in a store 🏪)
module.exports = {
  emailModel,
};
