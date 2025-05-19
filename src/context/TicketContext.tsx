import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Ticket {
  id: string;
  issueType: string;
  createdDate: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  comment?: string;
  name: string;
  department: string;
  email: string;
  submittedByImage?: string;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (id: string, newStatus: Ticket['status']) => void;
  removeTicket: (id: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
  const saved = localStorage.getItem('tickets');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('tickets', JSON.stringify(tickets));
}, [tickets]);

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  const updateTicketStatus = (id: string, newStatus: Ticket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const removeTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };
  
  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus, removeTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};
