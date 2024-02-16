const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  wardNumber: Number,
  capacity: Number,
  wardType: String,
});

const Ward = mongoose.model("Wsrd", wardSchema);

module.exports = Ward;
