// Credit: https://mui.com/material-ui/react-app-bar/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideBar from './SideBar.jsx';
import Cookies from 'js-cookie';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = useNavigate();
  
  const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  const logout = () => nav('/sign-in');

  return (
    <ThemeProvider theme={theme}>
      <SideBar open={menuOpen} setOpen={setMenuOpen} />
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              { Cookies.get('firstName') }
            </Typography>
            <Typography variant="h1" id="title" component="div" sx={{ flexGrow: 1 }}>
              Wordle xE
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
