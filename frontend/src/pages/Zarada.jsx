import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function Zarada() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          <MonetizationOnIcon sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
          Finansije
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#111', color: 'white', borderLeft: '5px solid #4caf50' }}>
              <CardContent>
                <Typography variant="h5">Ukupna Zarada</Typography>
                <Typography variant="h4" sx={{ color: '#4caf50', mt: 2 }}>0.00 RSD</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#111', color: 'white', borderLeft: '5px solid #f44336' }}>
              <CardContent>
                <Typography variant="h5">Ukupni Troškovi</Typography>
                <Typography variant="h4" sx={{ color: '#f44336', mt: 2 }}>0.00 RSD</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Zarada;