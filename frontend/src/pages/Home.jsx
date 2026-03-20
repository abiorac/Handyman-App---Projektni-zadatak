import React, { useState } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Card, CardContent, 
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions 
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import EuroIcon from '@mui/icons-material/Euro'; // Nova ikonica evra
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Home.css';

function Home() {
  const { vozila, dodajPopravku } = useData();
  const [open, setOpen] = useState(false);
  const [novaPopravka, setNovaPopravka] = useState({
    opis: '', voziloId: '', km: 0, zarada: 0, dodatniTrosak: 0, datum: new Date().toISOString().split('T')[0]
  });

  const handleSave = () => {
    const auto = vozila.find(v => v.id === novaPopravka.voziloId);
    let trosakGoriva = 0;
    
    if (auto) {
      // Formula za gorivo: (km / 100) * potrosnja * cena_goriva
      trosakGoriva = (Number(novaPopravka.km) / 100) * Number(auto.potrosnja) * Number(auto.cenaGoriva);
    }

    const ukupniTrosak = Number(novaPopravka.dodatniTrosak) + trosakGoriva;
    const profit = Number(novaPopravka.zarada) - ukupniTrosak;

    // Čuvanje u globalni niz (vidljivo na stranici Popravke)
    dodajPopravku({
      ...novaPopravka,
      id: Date.now(),
      datum: new Date(novaPopravka.datum).toDateString(), // Formatiranje radi usklađivanja sa kalendarom
      trosakGoriva,
      ukupniTrosak,
      profit
    });

    setOpen(false);
    setNovaPopravka({ opis: '', voziloId: '', km: 0, zarada: 0, dodatniTrosak: 0, datum: new Date().toISOString().split('T')[0] });
  };

  return (
    <Box className="home-bg">
      <Container maxWidth="lg" sx={{ textAlign: 'center', pt: 10 }}>
        <Typography variant="h1" className="home-title">Handyman App</Typography>
        <Typography variant="h5" sx={{ color: '#aaa', mb: 5 }}>
          Prati popravke, troškove i profit na jednom mestu.
        </Typography>

        <Box sx={{ mb: 8 }}>
          <Button 
            variant="contained" 
            className="action-btn-red"
            onClick={() => setOpen(true)}
          >
            NOVA POPRAVKA
          </Button>
          <Button 
            variant="outlined" 
            className="action-btn-outline"
            component={Link}
            to="/garaza"
          >
            MOJ AUTO
          </Button>
        </Box>

        {/* Centrirane i iste kartice */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Card className="home-card" component={Link} to="/popravke" sx={{ textDecoration: 'none' }}>
              <CardContent>
                <BuildIcon sx={{ fontSize: 50, color: '#ff1717', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', flex: 1}}>Pregled popravki</Typography>
                <Typography sx={{ color: '#888' }}>Sve tvoje popravke organizovane na jednom mestu.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <Card className="home-card" component={Link} to="/zarada" sx={{ textDecoration: 'none' }}>
              <CardContent>
                <EuroIcon sx={{ fontSize: 50, color: '#ff1717', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', flex: 1 }}>Zarada</Typography>
                <Typography sx={{ color: '#888' }}>Prati mesečni profit, zaradu i troškove.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Upit za novu popravku (Modal) */}
        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: '#1a1a1a', color: 'white', minWidth: '380px' } }}>
          <DialogTitle sx={{ color: '#ff1717', fontWeight: 'bold' }}>Nova Popravka</DialogTitle>
          <DialogContent>
            <TextField fullWidth type="date" label="Datum popravke" margin="dense" variant="filled" InputLabelProps={{ shrink: true }} sx={{ bgcolor: '#222', input: { color: 'white', colorScheme: 'dark' }, mb: 1 }} value={novaPopravka.datum} onChange={e => setNovaPopravka({...novaPopravka, datum: e.target.value})} />
            <TextField fullWidth label="Tip popravke" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, opis: e.target.value})} />
            <TextField select fullWidth label="Auto" margin="dense" variant="filled" sx={{ bgcolor: '#222', '& .MuiSelect-select': { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, voziloId: e.target.value})}>
              {vozila.map(v => <MenuItem key={v.id} value={v.id}>{v.marka} {v.model}</MenuItem>)}
            </TextField>
            <TextField fullWidth label="Kilometraža (put do klijenta)" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, km: e.target.value})} />
            <TextField fullWidth label="Zarada (din)" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, zarada: e.target.value})} />
            <TextField fullWidth label="Dodatni troškovi" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, dodatniTrosak: e.target.value})} />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} sx={{ color: '#888' }}>OTKAŽI</Button>
            <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#ff1717' }}>SAČUVAJ</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Home;