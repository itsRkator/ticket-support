const express = require("express");
const supportAgentControllers = require("./../controllers/supportAgentController");

const router = express.Router();

router.post("/", supportAgentControllers.createSupportAgent);
router.get("/", supportAgentControllers.getAllAgent);

module.exports = router;
