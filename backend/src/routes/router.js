const express = require("express");

const supportAgentRoutes = require("./supportAgentRoutes");
const supportTicketRoutes = require("./supportTicketRoutes");

const router = express.Router();

router.use("/support-agents", supportAgentRoutes);
router.use("/support-tickets", supportTicketRoutes);

module.exports = router;
