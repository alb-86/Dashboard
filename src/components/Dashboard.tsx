import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, CircularProgress } from '@mui/material';
import { useTicketContext } from '../context/TicketContext';
import "../App.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { tickets } = useTicketContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [latestUpdates] = useState<string>('');

  const openTicketsCount = tickets.filter(ticket => ticket.status === 'Open').length;

  const openTickets = openTicketsCount;
  const tasksPending = openTicketsCount;

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const charData = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [
          tickets.length - tasksPending, 
          tasksPending                   
        ],
        backgroundColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ width: '100%', padding: '0rem', }}>
      <div style={{padding: '0rem', width: '100%'}}>
        <div
          style={{
            background: 'rgb(13, 66, 144)',
            backgroundImage: 'url("../../images/backgroundImg.jpg',
            padding: 1,
            fontSize: 28,
            color: '#fff',
            textAlign: 'left',
          }}
        >
          <h2>Account Dashboard</h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '50px',
            marginTop: '20px',
            border: '2px solid #eee',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                color: '#fff',
                background: 'rgb(13, 66, 144)',
                fontSize: 90,
                margin: '28px auto',
                height: '305px',
                width: '305px',
              }}
            >
              {openTickets}
            </p>
            <h4>Open Tickets</h4>
          </div>

          <div
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Doughnut
              style={{
                boxSizing: 'border-box',
                display: 'block',
                height: '320px',
                width: '320px',
              }}
              data={charData}
            />
            <h4>Tasks Pending</h4>
          </div>

          <div
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            {latestUpdates ? (
              <>
                <p>{latestUpdates}</p>
                <h4 style={{ marginTop: '10px', textAlign: 'center' }}>
                  Latest Updates
                </h4>
              </>
            ) : (
              <>
                <h4 style={{ marginBottom: '10px', textAlign: 'center' }}>
                  Latest Updates
                </h4>
                <p>No updates at the moment</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
