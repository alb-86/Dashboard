import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '../../context/TicketContext';

const departments = [
  'Engineering', 'Design', 'Marketing', 'Sales', 'Finance',
  'Human Resources', 'IT Support', 'Operations', 'Customer Service'
];

const issueTypes = ['Hardware', 'Software', 'Network'];

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

interface AddTicketModalProps {
  open: boolean;
  onClose: () => void;
  addTicket: (ticket: Ticket) => void;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({ open, onClose, addTicket }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    issueType: '',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.issueType ||
      !formData.comment
    ) {
      alert('Please fill all required fields');
      return;
    }
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
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-ticket-modal">
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit} noValidate>
        <Typography id="add-ticket-modal" variant="h6" component="h2" mb={2} textAlign="center">
          Submit New Ticket
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
                labelId="department-label"
                name="department"
                value={formData.department}
                label="Department"
                onChange={handleChange}
                required
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="issue-type-label">Issue Type</InputLabel>
            <Select
                labelId="issue-type-label"
                name="issueType"
                value={formData.issueType}
                label="Issue Type"
                onChange={handleChange}
                required
            >
              {issueTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextareaAutosize
            minRows={4}
            placeholder="Describe the issue..."
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            style={{ width: '100%', padding: 10, fontSize: 14, borderRadius: 4, borderColor: '#ccc' }}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Request
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddTicketModal;
