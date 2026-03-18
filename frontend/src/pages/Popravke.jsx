import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

function Popravke() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <BuildIcon sx={{ fontSize: 60, color: '#ff1744', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>Popravke</Typography>
      </Box>
    </Container>
  );
}

export default Popravke;