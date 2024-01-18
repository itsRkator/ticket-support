require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = require("./src/config/connection");
const router = require("./src/routes/router");

const app = express();

const PORT = process.env.PORT || 5000;

connection.connect();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
