import React, { useEffect, useState } from "react";

import { useSupportContext } from "../context/SupportContext";

import { Button, Grid, TextField } from "@mui/material";

const SupportAgentForm = () => {
  const { addSupportAgent } = useSupportContext();
  const [status, setStatus] = useState("");
  const [agentInfo, setAgentInfo] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [isValidInput, setIsValidInput] = useState('');

  useEffect(() => {
    setAgentInfo({
      name: "",
      email: "",
      phone: "",
      description: "",
    });
  }, []);

  const handleInputChange = (e) => {
    setAgentInfo({ ...agentInfo, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setAgentInfo({
      name: "",
      email: "",
      phone: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isDataValid = await isValidData(agentInfo.email, agentInfo.phone);
      if (isDataValid) {
        const createdAgent = await addSupportAgent(agentInfo);
        if (createdAgent) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
        setTimeout(() => {
          setStatus("");
        }, 2000);
        handleResetForm();
      } else {
        setTimeout(() => {
          setIsValidInput("");
        }, 2000);
        throw Error("Invalid email or phone");
      }
    } catch (err) {
      console.log("Error creating Support Agent: ", err);
    }
  };

  const isValidData = (email, phone) => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isInputValid = emailRegex.test(email) && phoneRegex.test(phone);
    setIsValidInput(isInputValid)
    return isInputValid;
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
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          padding: "2rem",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Support Agent</h2>
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
            Agent created successfully.
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
            Error creating agent.
          </p>
        )}
        {isValidInput === false && (
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
            Invalid email or phone.
          </p>
        )}

        <form onSubmit={handleSubmit} onReset={handleResetForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                value={agentInfo.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={agentInfo.email}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                value={agentInfo.phone}
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
                value={agentInfo.description}
                onChange={handleInputChange}
                fullWidth
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
                Create Agent
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default SupportAgentForm;
