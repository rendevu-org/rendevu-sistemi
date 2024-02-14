const monngoose = require("mongoose");

const connectDB = async (url) => {
  return monngoose.connect(url).then(() => {
    console.log("Connected to the database");
  });
};

module.exports = connectDB;