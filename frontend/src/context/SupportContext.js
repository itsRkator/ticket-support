import { createContext, useContext, useEffect, useReducer } from "react";

import {
  createSupportAgent,
  createSupportTicket,
  getAllTickets,
} from "../services/api";

const SupportContext = createContext();

const initialState = {
  agents: [],
  tickets: [],
};

const actionTypes = {
  ADD_AGENT: "ADD_AGENT",
  ADD_TICKETS: "ADD_TICKETS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_AGENT:
      return { ...state, agents: [...state.agents, action.payload] };
    case actionTypes.ADD_TICKETS:
      return { ...state, tickets: [...state.tickets, action.payload] };
    default:
      return state;
  }
};

const SupportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addSupportAgent = async (agentData) => {
    try {
      const newAgent = await createSupportAgent(agentData);
      dispatch({ type: actionTypes.ADD_AGENT, payload: newAgent });
      return newAgent;
    } catch (err) {
      console.error("Error creating support agent: ", err);
    }
  };

  const addSupportTicket = async (ticketData) => {
    try {
      const newTicket = await createSupportTicket(ticketData);
      dispatch({ type: actionTypes.ADD_TICKETS, payload: newTicket });
      return newTicket;
    } catch (err) {
      console.error("Error creating support ticket: ", err);
    }
  };

  const fetchAllTickets = async () => {
    try {
      const apiResponse = await getAllTickets();
      dispatch({ type: actionTypes.ADD_TICKETS, payload: apiResponse.tickets });
    } catch (err) {
      console.error("Error fetching tickets: ", err);
    }
  };

  // useEffect(() => {
  //   const initializeData = async () => {
  //     await fetchAllTickets();
  //   };

  //   initializeData();
  // }, []);

  return (
    <SupportContext.Provider
      value={{ state, addSupportAgent, addSupportTicket, fetchAllTickets }}
    >
      {children}
    </SupportContext.Provider>
  );
};

const useSupportContext = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error("useSupportContext must be used within a SupportProvider");
  }
  return context;
};

export { SupportProvider, useSupportContext };
