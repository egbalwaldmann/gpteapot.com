// 🧪 Technical Summary: This file sets up a connection to the MongoDB database using Mongoose and dotenv. Mongoose is configured with certain settings, and dotenv is used to manage environment variables. 🌉

// 🏰 Non-Technical Summary: This file is like the bridge between our application and the database. It makes sure they can communicate with each other securely and efficiently. 🌟



// 📚 Import Mongoose (our MongoDB helper) 🛠️
const mongoose = require("mongoose");
// 🌐 Import dotenv (our environment variable manager) 🗝️
const dotEnv = require("dotenv");

// 🌐 Load environment variables from .env file (like keys to a secret vault) 🔑
dotEnv.config({ path: "./config.env" });

// 🛠️ Configure Mongoose settings (setting rules for our database helper) 🔧
mongoose.set("strictQuery", false);

// 🗄️ Connect to MongoDB database (like connecting a phone to the internet) 📡
const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster-gpteapot.dhktxzx.mongodb.net/chatGPT`
    );
    // 🎉 Announce successful connection to the database 📣
    console.log("data base is connected");
  } catch (error) {
    // 🚨 Show an error message if something goes wrong ⚠️
    console.log("someting wrong", error);
  }
};

// 📤 Export the connection function for use in other files 📦
module.exports = connectToDataBase;
