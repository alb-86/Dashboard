import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ITRequest from './components/ITRequestForm';
import { StaffDirectory } from './components/StaffDirectory';
import Tickets from './components/Tickets';
import Todo from './components/TodoList';

import { TicketProvider } from './context/TicketContext';

const App : React.FC = () => {
  return (
    <AuthProvider>
      <Router>
      <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar style={{display: 'none'}} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/staff-directory" element={<StaffDirectory  />} />
            <Route path="/it-request" element={<> <TicketProvider><ITRequest /></TicketProvider></>} />
            <Route path="/tickets" element={ <TicketProvider><Tickets /></TicketProvider>} />
            <Route path="/todo" element={<Todo />} />
          </Route>
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
};
 
export default App;
