import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography, } from '@mui/material';

interface StaffMember {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    department: string;
    location: string;
    status: string;
    lastLogin: string;
    driveStorage: string;
    device: string;
    image: string;
}

interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={staff.image} />}
        title={staff.name}
        header={staff.role}
        subheader={staff.department}
      />
      <CardContent>
        <Typography>Email: {staff.email}</Typography>
        <Typography>Status: {staff.status}</Typography>
        <Typography>Last Login: {staff.lastLogin}</Typography>
        <Typography>Storage: {staff.driveStorage}</Typography>
        <Typography>Device: {staff.device}</Typography>
      </CardContent>
    </Card>
  );
};

export default StaffCard;
