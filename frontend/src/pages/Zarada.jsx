import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid, Card, CardContent, 
  MenuItem, TextField, ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useData } from '../context/DataContext';

function Zarada() {
  const { popravke } = useData();
  const [valuta, setValuta] = useState('RSD');
  // Postavljamo "all" kao početnu vrednost ili broj meseca
  const [mesec, setMesec] = useState("all"); 
  const [godina, setGodina] = useState(new Date().getFullYear());

  const meseciLista = [
    "Januar", "Februar", "Mart", "April", "Maj", "Jun", 
    "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
  ];

  // FILTRIRANJE: Provera da li je izabran specifičan mesec ili "Cela godina"
  const filtriranePopravke = popravke.filter(p => {
    const d = new Date(p.datum);
    const istaGodina = d.getFullYear() === godina;
    const istiMesec = mesec === "all" || d.getMonth() === mesec;
    return istaGodina && istiMesec;
  });

  // Kalkulacija sa zaštitom od NaN
  const ukupnaZarada = filtriranePopravke.reduce((acc, p) => acc + Number(p.zarada || 0), 0);
  const ukupniTroskovi = filtriranePopravke.reduce((acc, p) => acc + Number(p.ukupniTrosak || 0), 0);
  const cistProfit = ukupnaZarada - ukupniTroskovi;

  const formatiraj = (vrednost) => {
    const iznos = valuta === 'EUR' ? (vrednost / 117).toFixed(2) : vrednost.toLocaleString('sr-RS');
    return `${iznos} ${valuta}`;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white', pt: 5, pb: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
          <Typography variant="h3" sx={{ color: '#ff1717', fontWeight: 800 }}>Statistika Finansija</Typography>
          <ToggleButtonGroup 
            value={valuta} 
            exclusive 
            onChange={(e, v) => v && setValuta(v)} 
            sx={{ bgcolor: '#222', border: '1px solid #333' }}
          >
            <ToggleButton value="RSD" sx={{ color: 'white', '&.Mui-selected': { bgcolor: '#ff1717', color: 'white' } }}>RSD</ToggleButton>
            <ToggleButton value="EUR" sx={{ color: 'white', '&.Mui-selected': { bgcolor: '#ff1717', color: 'white' } }}>EUR (€)</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Selektori sa dodatom opcijom "Cela godina" */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField 
            select 
            size="small" 
            value={mesec} 
            onChange={(e) => setMesec(e.target.value)} 
            sx={{ bgcolor: '#222', borderRadius: 1, width: 180, '& .MuiSelect-select': { color: 'white' } }}
          >
            <MenuItem value="all">Cela godina</MenuItem>
            {meseciLista.map((m, i) => (
              <MenuItem key={i} value={i}>{m}</MenuItem>
            ))}
          </TextField>
          
          <TextField 
            select 
            size="small" 
            value={godina} 
            onChange={(e) => setGodina(e.target.value)} 
            sx={{ bgcolor: '#222', borderRadius: 1, width: 120, '& .MuiSelect-select': { color: 'white' } }}
          >
            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(g => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Centrirane kartice */}
        <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#1a1a1a', color: '#4caf50', border: '1px solid #333', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography sx={{ color: '#888' }}>Ukupna Zarada</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{formatiraj(ukupnaZarada)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#1a1a1a', color: '#ff1717', border: '1px solid #333', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingDownIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography sx={{ color: '#888' }}>Ukupni Troškovi</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{formatiraj(ukupniTroskovi)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#2e7d32', color: 'white', height: '100%', boxShadow: '0px 4px 20px rgba(46, 125, 50, 0.4)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AccountBalanceWalletIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography sx={{ fontWeight: 'bold' }}>Čist Profit</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{formatiraj(cistProfit)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Lista popravki</Typography>
        {filtriranePopravke.length === 0 ? (
          <Typography sx={{ color: '#666' }}>Nema podataka za izabrani period.</Typography>
        ) : (
          filtriranePopravke.map(p => (
            <Box key={p.id} sx={{ bgcolor: '#1a1a1a', p: 2, borderRadius: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
              <Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>{p.opis}</Typography>
                <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>{p.datum}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ color: '#4caf50', fontWeight: 'bold' }}>+{formatiraj(p.zarada)}</Typography>
                <Typography sx={{ color: '#ff1717', fontSize: '0.85rem' }}>Troškovi: {formatiraj(p.ukupniTrosak)}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
}

export default Zarada;