import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          ml: 1,
          transition: 'all 0.3s ease',
          fontSize: '1.2rem',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
