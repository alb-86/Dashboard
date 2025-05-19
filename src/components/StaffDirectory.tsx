import React, { useEffect, useState, useRef } from 'react';
import {Grid, Card, CardContent, Typography, CardMedia, Box, Select, MenuItem, FormControl,InputLabel, SelectChangeEvent, TextField, IconButton,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { staffData } from '../data/staffData';

import { CircularProgress } from '@mui/material';


interface Staff {
  name: string;
  role: string;
  department: string;
  email: string;
  status: string;
  lastLogin: string;
  driveStorage: string;
  device: string;
  image?: string;
}

interface StaffCardProps {
  staff: Staff;
}

export const StaffDirectory: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [sortDepartment, setSortDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStaffList(staffData);
      setLoading(false);
    }, 1000);
  
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
  
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearch(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleSortChange = (event: SelectChangeEvent) => {
    const department = event.target.value;
    setSortDepartment(department);

    if (department === 'All') {
      setStaffList(staffData);
    } else {
      const filteredStaff = staffData.filter((staff) => staff.department === department);
      setStaffList(filteredStaff);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredStaff = staffData.filter(
      (staff) =>
        staff.name.toLowerCase().includes(query)
    );

    setStaffList(filteredStaff);
  };

  return (
    <Box
      component="main"
      sx={{
      width: '100%',
  }}
>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          textAlign: 'left',
          background: 'rgb(13, 66, 144)',
          padding: 3,
          fontSize: 28,
          color: 'white',
         }}
      >
        Meet the Team
      </Typography>

      <Box ref={ searchRef } display="flex" justifyContent="flex-end" m={5} mr={0}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="sort-department-label">Sort by Department</InputLabel>
          <Select
            labelId="sort-department-label"
            value={sortDepartment}
            label="Sort by Department"
            onChange={handleSortChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => setShowSearch((prev) => !prev)}>
            <SearchIcon />
          </IconButton>
          {showSearch && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search  staff name..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: 250 }}
              autoFocus

            />
          )}
        </Box>
      </Box>

      {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress size={60} />
          </Box>
        ) : staffList.length === 0 ? (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No team members found.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {staffList.map((staff, index) => (
                <Grid size={{ xs:12, sm:6, md: 4 }} key={index}>
                <StaffCard staff={staff} />
                </Grid>
              ))}
          </Grid>
        )}
    </Box>
  );
};

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return '#4caf50';
      case 'busy':
        return '#f44336';
      case 'away':
        return '#ff9800';
      case 'offline':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      {staff.image && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 3 }}
        >
          <CardMedia
            component="img"
            image={staff.image}
            alt={`${staff.name}'s profile`}
            sx={{
              height: 120,
              width: 120,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
      <CardContent sx={{ textAlign: 'center', px: 3, pb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {staff.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {staff.role}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Department:</strong> {staff.department}
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> {staff.email}
        </Typography>
        <Typography variant="body2">
          <strong>Drive Storage:</strong> {staff.driveStorage}
        </Typography>
        <Typography variant="body2">
          <strong>Device:</strong> {staff.device}
        </Typography>
        <Typography variant="body2">
          <strong>Status:</strong> {staff.status}{' '}
          <Box
            component="span"
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: getStatusColor(staff.status),
              display: 'inline-block',
              ml: 1,
            }}
          />
        </Typography>
        <Typography variant="body2">
          <strong>Last Login:</strong> {staff.lastLogin}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StaffDirectory;
