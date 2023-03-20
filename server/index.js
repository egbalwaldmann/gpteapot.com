const express = require("express");
const cors = require("cors");
const connectToDataBase = require("./connection/db");
const dotEnv = require("dotenv");

const router = require("./routes/email");

const app = express();

//*connect to data base
connectToDataBase();
//* cors policy
app.use(cors());

dotEnv.config({ path: "./config.env" });
//*router
app.use("/", router);
//*listen
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`server is runing at ${port}`);
});
