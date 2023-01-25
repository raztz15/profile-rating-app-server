const { mongo } = require("mongoose");

const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const profileSchema = new Schema({
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
