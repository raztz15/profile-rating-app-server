const { mongo } = require("mongoose");

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Profile", profileSchema);
