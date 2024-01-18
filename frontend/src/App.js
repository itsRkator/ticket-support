import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { SupportProvider } from "./context/SupportContext";
import SupportAgentForm from "./components/SupportAgentForm";
import SupportTicketForm from "./components/SupportTicketForm";
import SupportTicketList from "./components/SupportTicketList";
import NavBar from "./components/NavBar";

function App() {
  return (
    <SupportProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" Component={SupportTicketList} />
          <Route path="/create-support-agent" Component={SupportAgentForm} />
          <Route path="/create-support-ticket" Component={SupportTicketForm} />
        </Routes>
      </Router>
    </SupportProvider>
  );
}

export default App;
