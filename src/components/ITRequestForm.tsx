import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTicketContext, Ticket } from '../context/TicketContext';
import { v4 as uuidv4 } from 'uuid';

const departments = [
  'Engineering', 'Design', 'Marketing', 'Sales', 'Finance',
  'Human Resources', 'IT Support', 'Operations', 'Customer Service'
];


const inputStyle = {
  width: '100%',
  padding: '0.6rem 1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '15px',
  marginTop: '0.3rem',
  marginBottom: '1rem',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 500,
};

const ITRequest: React.FC = () => {
  const { addTicket} = useTicketContext();
  const [formData, setFormData] = useState({
    name: '', email: '', department: '', issueType: '', comment: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      department: formData.department,
      issueType: formData.issueType,
      comment: formData.comment,
      createdDate: new Date().toISOString(),
      status: 'Open',
      submittedByImage: 'https://via.placeholder.com/100',
    };
    addTicket(newTicket);
    setFormData({ name: '', email: '', department: '', issueType: '', comment: '' });
  };

  return (
    <Box component="main" sx={{ width: '100%', justifyItems: 'center' }}>
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
                 IT Services Ticket Request Form
          </Typography>
      <form onSubmit={handleSubmit}>
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              padding: '2rem',
              justifyItems: 'center',
              paddingTop: 5,
            }}
        >
          
            <h2 style={{ textAlign: 'center', fontSize: 19 }}>Please provide the details of your issue.</h2>
            <hr style={{ borderWidth: 1, marginBottom: 35, }} />

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name" required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email" required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={inputStyle}
                />
              </div>
            </div>

            <label style={labelStyle}>Department:</label>
            <select
              name="department" required
              value={formData.department}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>

            <label style={labelStyle}>Issue Type:</label>
            <select
              name="issueType" required
              value={formData.issueType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select an issue type</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
            </select>

            <label style={labelStyle}>Describe the Issue</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Describe the issue..." required
              style={{ ...inputStyle, resize: 'vertical', height: '100px' }}
            />

            <label style={labelStyle}>Upload Screenshot (optional)</label>
            <input type="file" name="attachment" style={{ ...inputStyle, padding: 10 }} />

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  padding: '0.7rem 2rem',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
      </form>
    </Box>
  );
};

export default ITRequest;
