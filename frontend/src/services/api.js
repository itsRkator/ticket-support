import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-ticket.onrender.com",
});

const createSupportAgent = async (agentData) => {
  const apiResponse = await API.post("/api/support-agents", agentData);
  return apiResponse.data;
};

const createSupportTicket = async (ticketData) => {
  const apiResponse = await API.post("/api/support-tickets", ticketData);
  return apiResponse.data;
};

const getAllTickets = async (queryParams) => {
  const apiResponse = await API.get(`/api/support-tickets?${queryParams}`);
  return apiResponse.data;
};

export { createSupportAgent, createSupportTicket, getAllTickets };
