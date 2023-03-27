const express = require("express"); // 🚀 Import express (like a car to drive on the web)
const cors = require("cors"); // 🔀 Import cors (like a passport for traveling between websites)
const connectToDataBase = require("./connection/db"); // 🌐 Import database connection (like a phonebook for saving data)
const dotEnv = require("dotenv"); // 🔐 Import dotenv for environment variables (like a secret diary for private info)

const router = require("./routes/email"); // 🛣️ Import email router (like a roadmap for managing emails)

const app = express(); // 📦 Create express app (like building the car for our journey)

// 🌐 Connect to the database (like opening the phonebook)
connectToDataBase();

// 🔀 Enable CORS policy (like stamping the passport for travel)
app.use(cors());

// 🔐 Load environment variables from config file (like unlocking the secret diary)
dotEnv.config({ path: "./config.env" });

// 🛣️ Use email router for handling requests (like following the roadmap to manage emails)
app.use("/", router);

// 🎧 Start listening for incoming requests (like starting the car and waiting for passengers)
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`🚀 Server is running at ${port} (like driving the car on the road)`);
});
