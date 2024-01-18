const SupportAgent = require("../models/supportAgent");

const createSupportAgent = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ message: "All fields are required" });

    const supportAgent = new SupportAgent({
      name,
      email,
      phone,
      description,
      active: true,
      dateCreated: new Date(),
    });

    await supportAgent.save();
    res
      .status(201)
      .json({ message: "Agent created successfully.", data: supportAgent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAgent = async (req, res) => {
  try {
    const agents = await SupportAgent.find();
    res
      .status(200)
      .json({ message: "Agent list fetched successfully!!", agents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSupportAgent, getAllAgent };
