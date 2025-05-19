import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Tooltip,
  Fab,
  MenuItem,
  Select
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { useTicketContext } from '../context/TicketContext';
import AddTicketModal from '../components/Modal/AddTicketModal';
import { staffData } from '../data/staffData';
import '../App.css';


const statusColors = {
  Open: 'error',
  'In Progress': 'warning',
  Resolved: 'success'
} as const;

const Tickets: React.FC = () => {
  const { tickets, addTicket, updateTicketStatus } = useTicketContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const findStaffByName = (name: string) => {
    return staffData.find((staff) => staff.name === name);
  };

  return (
    <Box component="main" sx={{ width: '100%' }}>
      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                          textAlign: 'left',
                          width: '100%',
                          background: 'rgb(13, 66, 144)',
                          padding: 3,
                          marginBottom: 5,
                          fontSize: 28,
                          color: 'white',
                        }}
                      >
                      Tickets
                </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Issue Type</strong></TableCell>
              <TableCell><strong>Created Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Issue</strong></TableCell>
              <TableCell><strong>Submitted By</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.issueType}</TableCell>
                <TableCell>
                  {new Date(ticket.createdDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </TableCell>
                <TableCell>
                  <Select
                    value={ticket.status}
                    size="small"
                    onChange={(e) =>
                      updateTicketStatus(ticket.id, e.target.value as typeof ticket.status)
                    }
                    sx={{
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: `${statusColors[ticket.status]}.main`,
                      '& .MuiSelect-icon': { color: 'white' }
                    }}
                  >
                    {['Open', 'In Progress', 'Resolved'].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{ticket.comment ? ticket.comment : '—'}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    {(() => {
                      const staff = findStaffByName(ticket.name);
                      if (!staff) return 'Unknown';
                      return (
                        <Tooltip
                          arrow
                          title={
                            <Box sx={{ p: 1, maxWidth: 250 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <img
                                  src={staff.image}
                                  alt={staff.name}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginRight: 8,
                                  }}
                                />
                                <Box>
                                  <strong>{staff.name}</strong><br />
                                  <small>{staff.role}</small>
                                </Box>
                              </Box>
                            </Box>
                          }
                        >
                          <img
                            src={staff.image}
                            alt={staff.name}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                          />
                        </Tooltip>
                      );
                    })()}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ position: 'fixed', bottom: 30, right: 30 }}
      >
        <AddIcon />
      </Fab>

      <AddTicketModal open={open} onClose={handleClose} addTicket={addTicket} />
    </Box>
  );
};
export default Tickets;
