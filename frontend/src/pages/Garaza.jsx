import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function Garaza() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <DirectionsCarIcon sx={{ fontSize: 60, color: '#ff1744', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>Moja Garaža</Typography>
        <Card sx={{ bgcolor: '#111', color: 'white', borderLeft: '5px solid #ff1744' }}>
          <CardContent>
            <Typography variant="h6">Podaci o vozilu</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Garaza; 