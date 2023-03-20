const express = require("express");
const router = express.Router();
router.use(express.json());

const { emailModel } = require("../model/userEmail");

//*Post Email
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
      res.status(404).send("we have this emails try for other name");
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
router.delete("/deleteEmail/:id", async (req, res) => {
  try {
    const emails = await emailModel.findByIdAndRemove(req.params.id);
    if (!emails) {
      return res.status(404).send("we cant found this id");
    }
    res.send(emails);
  } catch (ex) {
    res.send(ex.message);
  }
});

//*Update Email
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
      return res.status(404).send("we cant found this id");
    }
    res.send(newEmail);
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
