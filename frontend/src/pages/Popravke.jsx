import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Card, CardContent } from '@mui/material';
import { useData } from '../context/DataContext';
import './Popravke.css';

function Popravke() {
  const { vozila, popravke, dodajPopravku } = useData();
  const [datum, setDatum] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [novaPopravka, setNovaPopravka] = useState({
    opis: '', voziloId: '', km: 0, zarada: 0, dodatniTrosak: 0
  });

  const handleSave = () => {
    const auto = vozila.find(v => v.id === novaPopravka.voziloId);
    let trosakGoriva = 0;
    if (auto) {
      trosakGoriva = (Number(novaPopravka.km) / 100) * Number(auto.potrosnja) * Number(auto.cenaGoriva);
    }
    const ukupniTrosak = Number(novaPopravka.dodatniTrosak) + trosakGoriva;
    const profit = Number(novaPopravka.zarada) - ukupniTrosak;

    dodajPopravku({
      ...novaPopravka,
      id: Date.now(),
      datum: datum.toDateString(),
      trosakGoriva,
      ukupniTrosak,
      profit
    });
    setOpen(false);
    setNovaPopravka({ opis: '', voziloId: '', km: 0, zarada: 0, dodatniTrosak: 0 });
  };

  const popravkeZaDan = popravke.filter(p => p.datum === datum.toDateString());

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: 'white', pt: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ color: '#ff1717', fontWeight: 800, mb: 4, textAlign: 'center' }}>
          Kalendar Popravki
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Calendar onChange={setDatum} value={datum} className="custom-calendar" />
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button 
            variant="contained" 
            sx={{ bgcolor: '#ff1717', fontWeight: 'bold', px: 4 }}
            onClick={() => setOpen(true)}
          >
            DODAJ POPRAVKU
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mb: 2, borderBottom: '1px solid #333', pb: 1 }}>
          Popravke za: {datum.toLocaleDateString('sr-RS')}
        </Typography>

        {popravkeZaDan.length === 0 ? (
          <Typography sx={{ color: '#666', fontStyle: 'italic' }}>Nema unetih popravki za ovaj datum.</Typography>
        ) : (
          popravkeZaDan.map(p => (
            <Card key={p.id} sx={{ bgcolor: '#1a1a1a', color: 'white', mb: 2, borderLeft: '5px solid #ff1717' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ff1717' }}>{p.opis}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography>Zarada: {p.zarada} din</Typography>
                  <Typography>Trošak: {p.ukupniTrosak.toFixed(0)} din</Typography>
                  <Typography sx={{ fontWeight: 'bold', color: p.profit >= 0 ? '#4caf50' : '#ff1717' }}>
                    Profit: {p.profit.toFixed(0)} din
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}

        <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: '#1a1a1a', color: 'white', minWidth: '350px' } }}>
          <DialogTitle sx={{ color: '#ff1717', fontWeight: 'bold' }}>Nova Popravka</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Tip popravke" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, opis: e.target.value})} />
            <TextField select fullWidth label="Auto" margin="dense" variant="filled" sx={{ bgcolor: '#222', '& .MuiSelect-select': { color: 'white' } }} value={novaPopravka.voziloId} onChange={e => setNovaPopravka({...novaPopravka, voziloId: e.target.value})}>
              {vozila.map(v => <MenuItem key={v.id} value={v.id}>{v.marka} {v.model}</MenuItem>)}
            </TextField>
            <TextField fullWidth label="Kilometraža (put do klijenta)" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, km: e.target.value})} />
            <TextField fullWidth label="Zarada (din)" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, zarada: e.target.value})} />
            <TextField fullWidth label="Dodatni troškovi" type="number" margin="dense" variant="filled" sx={{ bgcolor: '#222', input: { color: 'white' } }} onChange={e => setNovaPopravka({...novaPopravka, dodatniTrosak: e.target.value})} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={{ color: '#888' }}>OTKAŽI</Button>
            <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#ff1717' }}>SAČUVAJ</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Popravke;