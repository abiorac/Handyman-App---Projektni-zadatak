import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#121212' }}>
      <AppBar 
        position="fixed" // Promenjeno u fixed da bi uvek bio na vrhu
        sx={{ 
          bgcolor: '#000', 
          borderBottom: '1px solid rgba(255, 23, 23, 0.5)', 
          boxShadow: '0px 4px 20px rgba(255, 23, 23, 0.4)',
          zIndex: 1100
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component={Link} to="/" sx={{ 
              color: '#ff1717',
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
              <Button color="inherit" component={Link} to="/zarada" sx={{ mx: 1, fontSize: '0.8rem', fontWeight: 'bold' }}>ZARADA</Button>
              <Button variant="outlined" component={Link} to="/login" sx={{ 
                color: '#ff1717', 
                borderColor: '#ff1717',
                ml: 2,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#ff1717', color: 'white' }
              }}>
                PRIJAVI SE
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Dodajemo prazan prostor ispod Navbara da sadržaj ne bi pobegao pod njega */}
      <Toolbar /> 
    </Box>
  );
};

export default Layout;