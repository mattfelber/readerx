import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF',
    },
    background: {
      default: '#F5F5F7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#6e6e73',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e5e5e7',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0A84FF',
    },
    background: {
      default: '#000000',
      paper: '#1c1c1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8e8e93',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1c1c1e',
          border: '1px solid #38383a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('tradux-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('tradux-theme', newMode ? 'dark' : 'light');
      document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Set initial theme attribute and listen for system theme changes
  useEffect(() => {
    // Set initial theme attribute
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if no preference is saved
      if (!localStorage.getItem('tradux-theme')) {
        setIsDarkMode(e.matches);
        document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isDarkMode]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
