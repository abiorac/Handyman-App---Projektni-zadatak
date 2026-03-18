import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#121212', minHeight: '100vh' }}>
      {/* Navbar sa specifičnim crvenim sjajem */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: '#000', 
          borderBottom: '1px solid rgba(255, 23, 68, 0.5)', // Tanka polutransparentna linija
          boxShadow: '0px 4px 20px rgba(255, 23, 68, 0.4)' // Crveni neon sjaj ka dole
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component={Link} to="/" sx={{ 
              color: '#ff1744', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              fontSize: '1.5rem',
              letterSpacing: '1px'
            }}>
              Handyman App
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/" sx={{ mx: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>POČETNA</Button>
              <Button color="inherit" component={Link} to="/popravke" sx={{ mx: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>POPRAVKE</Button>
              <Button color="inherit" component={Link} to="/garaza" sx={{ mx: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>GARAŽA</Button>
              <Button variant="outlined" component={Link} to="/login" sx={{ 
                color: '#ff1744', 
                borderColor: '#ff1744',
                ml: 2,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#ff1744', color: 'white' }
              }}>
                PRIJAVI SE
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sadržaj stranica */}
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;