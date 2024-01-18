const express = require("express");

const supportTicketController = require("../controllers/supportTicketController");

const router = express.Router();

router.post("/", supportTicketController.createSupportTicket);
router.get("/", supportTicketController.getAllTickets);

module.exports = router;
