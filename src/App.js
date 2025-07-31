import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { ThemeContextProvider } from './contexts/ThemeContext';
import TextReader from './components/TextReader';
import ApiTest from './components/ApiTest';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeContextProvider>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tradux
            </Typography>
            <ThemeToggle />
          </Toolbar>
        </AppBar>
        <div className="App">
          <ApiTest />
          <TextReader />
        </div>
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
