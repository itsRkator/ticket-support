const mongoose = require("mongoose");

const supportAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  description: { type: String },
  active: { type: Boolean },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportAgent", supportAgentSchema);
