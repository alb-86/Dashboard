import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleColorMode, mode } = useThemeMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
