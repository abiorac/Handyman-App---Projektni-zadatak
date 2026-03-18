import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import './Home.css';

function Home() {
  return (
    <Box className="home-bg">
      <Container maxWidth="lg" className="home-container">
        <Box className="hero-section" sx={{ mb: 8 }}>
          <Typography variant="h1" className="hero-title">
            Handyman App
          </Typography>
          <Typography variant="h5" className="hero-subtitle">
            Prati popravke, troškove i profit na jednom mestu.
          </Typography>
          <Box className="hero-buttons">
            <Button variant="contained" className="btn-red" component={Link} to="/popravke">
              NOVA POPRAVKA
            </Button>
            <Button variant="contained" className="btn-dark" component={Link} to="/garaza">
              MOJ AUTO
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
            <Card className="feature-card" component={Link} to="/popravke">
              <CardContent sx={{ textAlign: 'center' }}>
                <BuildIcon className="card-icon" />
                <Typography variant="h5" className="card-title">
                  Pregled popravki
                </Typography>
                <Typography variant="body1" className="card-text">
                  Sve tvoje popravke organizovane na jednom mestu.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
            <Card className="feature-card" component={Link} to="/zarada">
              <CardContent sx={{ textAlign: 'center' }}>
                <MonetizationOnIcon className="card-icon" />
                <Typography variant="h5" className="card-title">
                  Zarada
                </Typography>
                <Typography variant="body1" className="card-text">
                  Prati mesečni profit, zaradu i troškove.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;