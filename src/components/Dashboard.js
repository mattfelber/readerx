import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Container
} from "@mui/material";
// Using text labels instead of MUI icons for compatibility
import { supabase } from "../supabaseClient";
export default function Dashboard({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const getCurrentTab = () => {
    if (location.pathname === '/saved-words') return 1;
    return 0;
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('/dashboard');
    } else if (newValue === 1) {
      navigate('/saved-words');
    }
  };

  return (
    <Box>
      {/* Sub Navigation */}
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" component="div">
                Welcome, {user?.email}
              </Typography>
              <Tabs
                value={getCurrentTab()}
                onChange={handleTabChange}
                sx={{ ml: 2 }}
              >
                <Tab
                  label="📖 Reader"
                />
                <Tab
                  label="📚 Saved Words"
                />
              </Tabs>
            </Box>
            <Button
              onClick={handleLogout}
              variant="outlined"
              size="small"
            >
              🚪 Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
