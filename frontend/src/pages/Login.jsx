import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { setUser } = useData();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();

      if (res.ok) {
        // data sada sadrži npr. { id: 1, username: "admin" }
        setUser(data); 
        navigate('/');
      } else {
        alert(data.error || "Pogrešni podaci");
      }
    } catch (err) {
      alert("Server nije dostupan. Proverite da li app.py radi.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, bgcolor: '#1a1a1a', border: '1px solid #333', borderRadius: 2 }}>
          <Typography variant="h4" sx={{ color: '#ff1717', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>Prijava</Typography>
          <form onSubmit={handleLogin}>
            <TextField 
              fullWidth label="Korisničko ime" variant="filled" 
              sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 2 }}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <TextField 
              fullWidth label="Lozinka" type="password" variant="filled" 
              sx={{ bgcolor: '#222', input: { color: 'white' }, mb: 3 }}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: '#ff1717', py: 1.5, fontWeight: 'bold' }}>
              PRIJAVI SE
            </Button>
          </form>
          <Typography sx={{ mt: 2, textAlign: 'center', color: '#888' }}>
            Nemaš nalog? <Link to="/register" style={{ color: '#ff1717', textDecoration: 'none' }}>Registruj se</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;