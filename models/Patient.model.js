const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  issues: [String],
  admittedDate: String,
  dischargedDate: String,
  wardNumber: Number,
  phoneNumber: Number,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
