
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ApiTest from "./components/ApiTest";
import TextReader from "./components/TextReader";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007AFF",
    },
    background: {
      default: "#F5F5F7",
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard>
                  <ApiTest />
                  <TextReader />
                </Dashboard>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>

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
