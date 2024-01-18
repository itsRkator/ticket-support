const mongoose = require("mongoose");

const connect = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;

    await mongoose.connect(dbURI);

    console.log("Connected to Database!!!");
  } catch (error) {
    console.error("Failed to connect to Database: ", error);
  }
};

module.exports = { connect };
