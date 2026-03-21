import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Uspešna registracija!");
        navigate('/login');
      } else {
        alert(data.error || "Greška");
      }
    } catch (err) {
      alert("Backend nije dostupan.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px solid #333', borderRadius: 2 }}>
          <Typography variant="h4" sx={{ color: '#ff1717', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>Registracija</Typography>
          <form onSubmit={handleRegister}>
            <TextField fullWidth label="Korisničko ime" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 2 }}
              onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            <TextField fullWidth label="Lozinka" type="password" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 3 }}
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: '#ff1717', py: 1.5, fontWeight: 'bold' }}>KREIRAJ NALOG</Button>
          </form>
          <Typography sx={{ mt: 2, textAlign: 'center', color: '#888' }}>
            Imaš nalog? <Link to="/login" style={{ color: '#ff1717', textDecoration: 'none' }}>Prijavi se</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
export default Register;