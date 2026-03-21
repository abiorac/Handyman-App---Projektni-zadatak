import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Ovde će se dodati poziv ka Flask backendu
    console.log("Registracija:", formData);
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, bgcolor: '#1a1a1a', color: 'white', borderRadius: 4, border: '1px solid #333' }}>
          <Typography variant="h4" sx={{ color: '#ff1717', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            Registracija
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth label="Korisničko ime"
              margin="normal" variant="filled"
              sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 2 }}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <TextField
              fullWidth label="Lozinka"
              type="password" margin="normal" variant="filled"
              sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 2 }}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <TextField
              fullWidth label="Potvrdi lozinku"
              type="password" margin="normal" variant="filled"
              sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 3 }}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            <Button 
              fullWidth variant="contained" type="submit"
              sx={{ bgcolor: '#ff1717', fontWeight: 'bold', py: 1.5, '&:hover': { bgcolor: '#b21010' } }}
            >
              KREIRAJ NALOG
            </Button>
          </form>
          <Typography sx={{ mt: 3, textAlign: 'center', color: '#888' }}>
            Već imate nalog? <Link to="/login" style={{ color: '#ff1717', textDecoration: 'none' }}>Prijavite se</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;