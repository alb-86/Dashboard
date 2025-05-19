import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';


const Layout: React.FC = () => {
  useAuth();

  return (
    <div style={{ display: 'flex' }}>

      <Sidebar />
      <div style={{ padding: '0rem', width: '100%' }}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
