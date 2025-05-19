import React from 'react';
import { useTicketContext } from '../context/TicketContext';
import { Button } from '@mui/material';

type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

const TicketsList: React.FC = () => {
    const { tickets, updateTicketStatus, removeTicket } = useTicketContext();
    const handleStatusChange = (id: string, currentStatus: TicketStatus) => {
    const statuses: TicketStatus[] = ['Open', 'In Progress', 'Resolved'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateTicketStatus(id, nextStatus);};

    return (
    <>
    {tickets.map((ticket) => (
        <div key={ticket.id}>
        <p>{ticket.issueType} - Status: {ticket.status}</p>
        <Button onClick={() => handleStatusChange(ticket.id, ticket.status)}>Change Status</Button>
        <Button onClick={() => removeTicket(ticket.id)}>Delete Ticket</Button>
        </div>
    ))}
    </>
  );
};

export default TicketsList;
