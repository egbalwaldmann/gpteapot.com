const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);
const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster-gpteapot.dhktxzx.mongodb.net/chatGPT`
    );
    console.log("data base is connected");
  } catch (error) {
    console.log("someting wrong", error);
  }
};

module.exports = connectToDataBase;
