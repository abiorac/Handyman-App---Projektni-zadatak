import React, { useState } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Card, CardContent, 
  Dialog, DialogTitle, DialogContent, TextField, MenuItem, 
  DialogActions, Alert, IconButton 
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from '../context/DataContext';
import './Garaza.css';

const GORIVA = [
  { label: 'Benzin', cena: 186 },
  { label: 'Dizel', cena: 208 },
  { label: 'TNG', cena: 97 }
];

function Garaza() {
  const { vozila, dodajVozilo, obrisiVozilo } = useData();
  const [open, setOpen] = useState(false);
  const [novoVozilo, setNovoVozilo] = useState({ 
    marka: '', model: '', potrosnja: '', gorivo: 'Benzin', registracija: '' 
  });

  const proveriStatus = (datumInput) => {
    if (!datumInput) return 'ok';
    const danas = new Date();
    danas.setHours(0, 0, 0, 0);
    const izabrani = new Date(datumInput);
    izabrani.setHours(0, 0, 0, 0);
    const diffVreme = izabrani.getTime() - danas.getTime();
    const diffDani = Math.round(diffVreme / (1000 * 60 * 60 * 24));

    if (diffDani < 0) return 'istekla';
    if (diffDani <= 30) return 'skoro';
    return 'ok';
  };

  const handleSave = () => {
    if (!novoVozilo.marka || !novoVozilo.model || !novoVozilo.registracija || !novoVozilo.potrosnja) {
      alert("Sva polja moraju biti popunjena!");
      return;
    }

    const status = proveriStatus(novoVozilo.registracija);
    if (status === 'istekla') {
      alert("Greška! Ne možete uneti datum registracije koji je već prošao.");
      return;
    }

    const gorivoInfo = GORIVA.find(g => g.label === novoVozilo.gorivo);
    const cena = gorivoInfo ? gorivoInfo.cena : 0;
    
    // Šaljemo podatke u DataContext
    dodajVozilo({ 
      ...novoVozilo, 
      cenaGoriva: cena 
    });

    setNovoVozilo({ marka: '', model: '', potrosnja: '', gorivo: 'Benzin', registracija: '' });
    setOpen(false);
  };

  return (
    <Box className="garaza-bg" sx={{ minHeight: '100vh', bgcolor: '#121212', pb: 5 }}>
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'center' }}>
          <Typography variant="h3" sx={{ color: '#ff1717', fontWeight: 800 }}>Moja Garaža</Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            sx={{ bgcolor: '#ff1717', '&:hover': { bgcolor: '#b21010' }, fontWeight: 'bold' }} 
            onClick={() => setOpen(true)}
          >
            DODAJ NOVO VOZILO
          </Button>
        </Box>

        <Grid container spacing={4}>
          {vozila.map((v) => {
            const status = proveriStatus(v.registracija);
            return (
              <Grid item xs={12} md={6} lg={4} key={v.id}>
                <Card className="vehicle-card-large" sx={{ 
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  borderLeft: status === 'skoro' ? '8px solid #ff9800' : '8px solid #ff1717',
                  position: 'relative'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <DirectionsCarIcon sx={{ color: status === 'skoro' ? '#ff9800' : '#ff1717', fontSize: 40 }} />
                      <IconButton onClick={() => obrisiVozilo(v.id)} sx={{ color: '#ff1717' }}>
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </Box>

                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                      {v.marka} {v.model}
                    </Typography>

                    <Box sx={{ borderTop: '1px solid #333', pt: 2, mt: 2 }}>
                      {/* Backend nekad šalje cena_goriva umesto gorivo, pa dodajemo zaštitu */}
                      <Typography sx={{ color: '#aaa', fontSize: '1.1rem', mb: 1 }}>
                        Potrošnja: <strong>{v.potrosnja} L/100km</strong>
                      </Typography>
                      
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', bgcolor: '#222', p: 1, borderRadius: 1 }}>
                        Registracija: {v.registracija || "Nije uneto"}
                      </Typography>

                      {status === 'skoro' && (
                        <Alert 
                          severity="warning" 
                          icon={false}
                          sx={{ mt: 2, bgcolor: '#ff9800', color: 'black', fontWeight: 900, textAlign: 'center' }}
                        >
                          ISTIČE USKORO!
                        </Alert>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: '#1a1a1a', color: 'white' } }}>
          <DialogTitle sx={{ color: '#ff1717', fontWeight: 'bold' }}>Novo Vozilo</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Marka" margin="normal" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={(e) => setNovoVozilo({...novoVozilo, marka: e.target.value})} />
            <TextField fullWidth label="Model" margin="normal" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={(e) => setNovoVozilo({...novoVozilo, model: e.target.value})} />
            <TextField fullWidth label="Potrošnja (L/100km)" type="number" margin="normal" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={(e) => setNovoVozilo({...novoVozilo, potrosnja: e.target.value})} />
            
            <TextField select fullWidth label="Gorivo" margin="normal" variant="filled" sx={{ bgcolor: '#222', '& .MuiSelect-select': { color: 'white' } }} value={novoVozilo.gorivo} onChange={(e) => setNovoVozilo({...novoVozilo, gorivo: e.target.value})}>
              {GORIVA.map(g => (
                <MenuItem key={g.label} value={g.label}>{g.label}</MenuItem>
              ))}
            </TextField>

            <TextField 
              fullWidth type="date" label="Datum registracije" margin="normal" variant="filled" 
              InputLabelProps={{ shrink: true }} 
              sx={{ 
                bgcolor: '#222', 
                input: { color: 'white' },
                '& input::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } 
              }} 
              onChange={(e) => setNovoVozilo({...novoVozilo, registracija: e.target.value})} 
            />
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

export default Garaza;