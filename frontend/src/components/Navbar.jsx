import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

function Navbar() {
  const { user, logout } = useData();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #ff1717' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ color: '#ff1717', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Handyman App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              {/* Opcije za ulogovanog korisnika */}
              <Button component={Link} to="/" sx={{ color: 'white' }}>POČETNA</Button>
              <Button component={Link} to="/popravke" sx={{ color: 'white' }}>POPRAVKE</Button>
              <Button component={Link} to="/garaza" sx={{ color: 'white' }}>GARAŽA</Button>
              <Button component={Link} to="/zarada" sx={{ color: 'white' }}>ZARADA</Button>
              <Button 
                onClick={() => { logout(); navigate('/login'); }} 
                variant="outlined" 
                sx={{ color: '#ff1717', borderColor: '#ff1717' }}
              >
                ODJAVI SE
              </Button>
            </>
          ) : (
            <>
              {/* Opcije za neregistrovanog/neulogovanog korisnika */}
              <Button component={Link} to="/login" sx={{ color: 'white' }}>PRIJAVI SE</Button>
              <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                sx={{ bgcolor: '#ff1717', '&:hover': { bgcolor: '#b21010' } }}
              >
                REGISTRUJ SE
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;