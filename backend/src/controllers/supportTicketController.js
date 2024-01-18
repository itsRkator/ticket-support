const SupportAgent = require("../models/supportAgent");
const SupportTicket = require("../models/supportTicket");

const createSupportTicket = async (req, res) => {
  try {
    const { topic, description, severity, type } = req.body;
    const assignedAgent = await findNextAvailableAgent();
    const supportTicket = new SupportTicket({
      topic,
      description,
      severity,
      type,
      dateCreated: new Date(),
      assignedTo: assignedAgent.name,
      status: "New",
    });

    await supportTicket.save();
    res
      .status(201)
      .json({ message: "Ticket created successfully!!", data: supportTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find();
    res
      .status(200)
      .json({ message: "Ticket list fetched successfully!!", tickets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findNextAvailableAgent = async () => {
  try {
    const activeAgents = await SupportAgent.find({ active: true }).sort({
      dateCreated: 1,
    });

    if (activeAgents.length === 0) {
      throw new Error("No available support agents");
    }
    const nextAgentIndex = calculateNextAgentIndex(activeAgents);
    const nextAgent = activeAgents[nextAgentIndex];

    return nextAgent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const calculateNextAgentIndex = (activeAgents) => {
  const totalAgents = activeAgents.length;
  const lastAssignedIndex = (totalAgents - 1) % totalAgents;

  return (lastAssignedIndex + 1) % totalAgents;
};

module.exports = { createSupportTicket, getAllTickets };
