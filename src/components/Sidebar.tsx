import React, { useState } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Staff Directory', icon: <PeopleIcon />, path: '/staff-directory' },
  { text: 'IT Request', icon: <RequestPageIcon />, path: '/it-request' },
  { text: 'Tickets', icon: <ConfirmationNumberIcon />, path: '/tickets' },
  { text: 'To-Do List', icon: <ListAltIcon />, path: '/todo' },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box
      sx={{
        overflow: 'auto',
        color: '#1976d2',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        background: '#f3f3f3',

      }}
      >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          sx={{
            fontSize: 28,
            fontWeight: 600,
            textAlign: 'center',
            flexGrow: 1,
            color: '#1976d2',
            width: '100%',
          }}
        >
          Brr Media
        </Typography>
      </Toolbar>

      <List>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Fade in timeout={500 + index * 100} key={item.text}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  transition: 'all 0.3s ease',
                  borderLeft: isActive ? '10px solid #1976d2' : '4px solid transparent',
                  backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    transform: 'scale(1.02)',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive ? 600 : 500,
                    fontSize: 16,
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#1976d2', minWidth: 48 }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: 28 } })}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Fade>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <AppBar
            position="fixed"
            elevation={2}
            sx={{
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: '#1976d2',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Staff Panel
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                color: '#000',
                boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              backgroundColor: '#ffffff',
              color: '#000',
              boxShadow: '2px 0 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};
export default Sidebar;
