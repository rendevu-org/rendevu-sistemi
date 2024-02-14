const mongoose = require("mongoose");
const person = require("./person");

const rendevuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

module.exports = mongoose.model("Rendevu", rendevuSchema);
