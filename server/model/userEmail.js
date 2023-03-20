const e = require("express");
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const emailModel = mongoose.model("useremails", emailSchema);

// function saveAgin() {
//   const d = new emailModel({
//     id: 3,
//     email: "testforid@yahoo.com",
//   });
//   d.save();
// }
// saveAgin();

module.exports = {
  emailModel,
};
