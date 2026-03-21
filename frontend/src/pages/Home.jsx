import React, { useState } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Card, CardContent, 
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions 
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import EuroIcon from '@mui/icons-material/Euro';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Home.css';

function Home() {
  const { vozila, dodajPopravku, user } = useData();
  const [open, setOpen] = useState(false);
  const [novaPopravka, setNovaPopravka] = useState({
    opis: '', 
    voziloId: '', 
    km: '', 
    zarada: '', 
    dodatniTrosak: '', 
    datum: new Date().toISOString().split('T')[0]
  });

  const isUlogovan = !!user;

  const handleSave = () => {
    const auto = vozila.find(v => v.id === novaPopravka.voziloId);
    let trosakGoriva = 0;
    
    if (auto) {
      // Usklađujemo nazive sa bazom (cena_goriva ili cenaGoriva)
      const cena = Number(auto.cena_goriva || auto.cenaGoriva || 0);
      const potrosnja = Number(auto.potrosnja || 0);
      trosakGoriva = (Number(novaPopravka.km) / 100) * potrosnja * cena;
    }

    const ukupniTrosak = Number(novaPopravka.dodatniTrosak) + trosakGoriva;
    const izracunatiProfit = Number(novaPopravka.zarada) - ukupniTrosak;

    // Šaljemo podatke koristeći nazive koje backend očekuje (dodatniTrosak i profit)
    dodajPopravku({
      opis: novaPopravka.opis,
      voziloId: novaPopravka.voziloId,
      km: Number(novaPopravka.km),
      zarada: Number(novaPopravka.zarada),
      dodatniTrosak: ukupniTrosak, 
      profit: izracunatiProfit,
      datum: new Date(novaPopravka.datum).toDateString()
    });

    setOpen(false);
    // Resetujemo formu
    setNovaPopravka({ 
      opis: '', 
      voziloId: '', 
      km: '', 
      zarada: '', 
      dodatniTrosak: '', 
      datum: new Date().toISOString().split('T')[0] 
    });
  };

  return (
    <Box className="home-bg">
      <Container maxWidth="lg" sx={{ textAlign: 'center', pt: 10 }}>
        <Typography variant="h1" className="home-title">Handyman App</Typography>
        <Typography variant="h5" sx={{ color: '#aaa', mb: 5 }}>
          Prati popravke, troškove i profit na jednom mestu.
        </Typography>

        {isUlogovan ? (
          <>
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

            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
              <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Card 
                  className="home-card" 
                  component={Link} 
                  to="/popravke" 
                  sx={{ textDecoration: 'none', flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <BuildIcon sx={{ fontSize: 50, color: '#ff1717', mb: 2 }} />
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                      Pregled popravki
                    </Typography>
                    <Typography sx={{ color: '#888' }}>
                      Sve tvoje popravke organizovane na jednom mestu.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Card 
                  className="home-card" 
                  component={Link} 
                  to="/zarada" 
                  sx={{ textDecoration: 'none', flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <EuroIcon sx={{ fontSize: 50, color: '#ff1717', mb: 2 }} />
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                      Zarada
                    </Typography>
                    <Typography sx={{ color: '#888' }}>
                      Prati mesečni profit, zaradu i troškove.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box sx={{ 
            mt: 5, p: 8, border: '1px dashed #333', borderRadius: 8,
            bgcolor: 'rgba(255, 23, 23, 0.02)' 
          }}>
            <Typography variant="h3" sx={{ color: '#ff1717', mb: 2, fontWeight: 'bold' }}>
              Dobrodošli
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', mb: 4, opacity: 0.8 }}>
              Molimo vas da se prijavite kako biste pristupili vašim podacima.
            </Typography>
            <Button 
              variant="contained" 
              className="action-btn-red" 
              component={Link} 
              to="/login"
              sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
            >
              PRIJAVI SE
            </Button>
          </Box>
        )}

        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: '#1a1a1a', color: 'white', minWidth: '380px' } }}>
          <DialogTitle sx={{ color: '#ff1717', fontWeight: 'bold' }}>Nova Popravka</DialogTitle>
          <DialogContent>
            <TextField fullWidth type="date" label="Datum popravke" margin="dense" variant="filled" InputLabelProps={{ shrink: true }} sx={{ bgcolor: '#222', input: { color: 'white', colorScheme: 'dark' }, mb: 1 }} value={novaPopravka.datum} onChange={e => setNovaPopravka({...novaPopravka, datum: e.target.value})} />
            <TextField fullWidth label="Tip popravke" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} value={novaPopravka.opis} onChange={e => setNovaPopravka({...novaPopravka, opis: e.target.value})} />
            <TextField select fullWidth label="Auto" margin="dense" variant="filled" sx={{ bgcolor: '#222', '& .MuiSelect-select': { color: 'white' } }} value={novaPopravka.voziloId} onChange={e => setNovaPopravka({...novaPopravka, voziloId: e.target.value})}>
              {vozila.map(v => <MenuItem key={v.id} value={v.id}>{v.marka} {v.model}</MenuItem>)}
            </TextField>
            <TextField fullWidth label="Kilometraža (put do klijenta)" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} value={novaPopravka.km} onChange={e => setNovaPopravka({...novaPopravka, km: e.target.value})} />
            <TextField fullWidth label="Zarada (din)" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} value={novaPopravka.zarada} onChange={e => setNovaPopravka({...novaPopravka, zarada: e.target.value})} />
            <TextField fullWidth label="Dodatni troškovi" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} value={novaPopravka.dodatniTrosak} onChange={e => setNovaPopravka({...novaPopravka, dodatniTrosak: e.target.value})} />
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