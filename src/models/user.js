const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, default: "", required: true },
  email: { type: String, default: "", required: true },
  gender: {
    type: String,
    default: "",
    enum: ["", "Male", "Female", "Other"],
    required: true,
  }, // M,F,O
  city: { type: String, default: "", required: true },
  password: { type: String, default: null, required: true },
});

module.exports = model("user", userSchema);
