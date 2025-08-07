import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

import { ThemeContextProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
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
    <ThemeContextProvider>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tradux
              </Typography>
              <ThemeToggle />
            </Toolbar>
          </AppBar>

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
        </Box>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;

