import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextType {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export const useThemeMode = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }
            : {}),
        },
      }),
    [mode]
  );
    
  useEffect(() => {
    const savedMode = localStorage.getItem('app-theme');
    if (savedMode === 'dark' || savedMode === 'light') {
      setMode(savedMode);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('app-theme', mode);
  }, [mode]); 

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
