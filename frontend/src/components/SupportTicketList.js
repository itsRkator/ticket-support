// SupportTicketList.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { getAllTickets } from "../services/api";

const SupportTicketList = () => {
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getAllTickets();
        setFilteredTickets(apiResponse.tickets);
      } catch (error) {
        console.error("Error fetching support tickets:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDateTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(timestamp).toLocaleString("en-US", options);
  };

  return (
    <div style={{ margin: "auto", width: "90%" }}>
      <h2 style={{ textAlign: "center" }}>Support Tickets</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ background: "#7B91A7" }}>
            <TableRow>
              <TableCell style={{ cursor: "pointer" }}>Topic</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Status</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Description</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Date Created</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Severity</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Type</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Assigned To</TableCell>
              <TableCell style={{ cursor: "pointer" }}>Resolved On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket) => (
                <TableRow key={ticket._id}>
                  <TableCell>{ticket.topic}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{formatDateTime(ticket.dateCreated)}</TableCell>
                  <TableCell>{ticket.severity}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>{ticket.assignedTo}</TableCell>
                  <TableCell>{ticket.resolvedOn}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredTickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default SupportTicketList;
