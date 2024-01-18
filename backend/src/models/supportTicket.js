const mongoose = require("mongoose");

const supportTicketSchema = mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: String },
  dateCreated: { type: Date, default: Date.now },
  severity: { type: String, required: true },
  type: { type: String },
  assignedTo: { type: String },
  status: { type: String },
  resolvedOn: { type: Date },
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
