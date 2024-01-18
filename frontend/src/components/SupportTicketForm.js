import React, { useState } from "react";

import { useSupportContext } from "../context/SupportContext";

import { Button, Grid, TextField } from "@mui/material";

const SupportTicketForm = () => {
  const { addSupportTicket } = useSupportContext();
  const [status, setStatus] = useState("");
  const [ticketInfo, setTicketInfo] = useState({
    topic: "",
    description: "",
    severity: "",
    type: "",
  });

  const handleInputChange = (e) => {
    setTicketInfo({ ...ticketInfo, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setTicketInfo({
      topic: "",
      description: "",
      severity: "",
      type: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdTicket = addSupportTicket(ticketInfo);
      if (createdTicket) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
      setTimeout(() => {
        setStatus("");
      }, 2000);
      handleResetForm();
    } catch (err) {
      console.error("Error creating support ticket: ", err);
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        width: "90%",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "50%",
          margin: "auto",
          justifyContent: "center",
          alignContent: "center",
          boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          padding: "2rem",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Support Ticket</h2>

        {status === "success" && (
          <p
            style={{
              fontWeight: "bolder",
              textAlign: "center",
              border: "1px solid green",
              padding: "1rem",
              background: "#05a57e33",
              borderRadius: "1rem",
              color: "#05a57e",
            }}
          >
            Ticket created successfully.
          </p>
        )}

        {status === "failed" && (
          <p
            style={{
              fontWeight: "bolder",
              textAlign: "center",
              border: "1px solid red",
              padding: "1rem",
              background: "#ff00001f",
              borderRadius: "1rem",
              color: "#ff0000",
            }}
          >
            Error creating ticket.
          </p>
        )}

        <form onSubmit={handleSubmit} onReset={handleResetForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="topic"
                label="Topic"
                variant="outlined"
                value={ticketInfo.topic}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                value={ticketInfo.description}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="severity"
                label="Severity"
                variant="outlined"
                value={ticketInfo.severity}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="type"
                label="Type"
                variant="outlined"
                value={ticketInfo.type}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{ margin: "0rem 1rem" }}
                type="reset"
                variant="contained"
                color="warning"
              >
                Reset
              </Button>
              <Button
                style={{ margin: "0rem 1rem" }}
                type="submit"
                variant="contained"
                color="success"
              >
                Create Ticket
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default SupportTicketForm;
