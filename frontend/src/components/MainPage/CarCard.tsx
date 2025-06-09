import React, { useState } from 'react';
import {
  Card, CardActions, CardContent, CardMedia,
  Button, Typography, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField
} from '@mui/material';
import './CarCard.css';

export interface CarData {
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  price_per_day: number;
  status: 'AVAILABLE' | 'RENTED' | 'INACTIVE';
  segment: string;
  przeglad_wazny_koniec: string;
  ubezpieczenie_koniec: string;
  image: string;
}

// Przykładowe rezerwacje
const reservations = [
  { start: '2025-06-15', end: '2025-06-21' },
  { start: '2025-07-01', end: '2025-07-05' }
];

interface CarCardProps {
  car: CarData;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStartDate('');
    setEndDate('');
  };

  const isDateBlocked = (date: string) => {
    const d = new Date(date);
    return reservations.some(r => {
      const from = new Date(r.start);
      const to = new Date(r.end);
      return d >= from && d <= to;
    });
  };

  const getMaxEndDate = (start: string) => {
    const startD = new Date(start);
    const futureRes = reservations
      .filter(r => new Date(r.start) > startD)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    if (futureRes.length > 0) {
      const maxDate = new Date(futureRes[0].start);
      maxDate.setDate(maxDate.getDate() - 1); // 1 dzień bufora
      return maxDate.toISOString().split('T')[0];
    }
    return undefined;
  };

  const calculateCost = (start: string, end: string) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffDays = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1;
    return diffDays * car.price_per_day;
  };

  return (
    <Card className="car-card">
      <CardMedia className="car-card__media" image={car.image} title={`${car.brand} ${car.model}`} />
      <CardContent className="car-card__content">
        <Typography variant="h6" component="div">
          {car.brand} {car.model} ({car.year})
        </Typography>
        <Typography variant="body2">
          {car.segment} • {car.status === 'AVAILABLE' ? 'Dostępny' : car.status === 'RENTED' ? 'Wynajęty' : 'Nieaktywny'} • {car.plate_number}
        </Typography>
        <Typography variant="body2">Cena: <strong>{car.price_per_day} PLN/dzień</strong></Typography>
        <Typography variant="body2">Przegląd do: {car.przeglad_wazny_koniec}</Typography>
        <Typography variant="body2">Ubezpieczenie do: {car.ubezpieczenie_koniec}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" disabled={car.status !== 'AVAILABLE'} onClick={handleClickOpen}>Wypożycz</Button>
      </CardActions>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Wybierz daty wypożyczenia</DialogTitle>
        <DialogContent>
          {/* Wypisanie zajętych terminów */}
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Zajęte terminy:
          </Typography>
          {reservations.map((r, i) => (
            <Typography variant="body2" key={i}>
              {r.start} – {r.end}
            </Typography>
          ))}

          {/* Wybór daty rozpoczęcia */}
          <TextField
            label="Data rozpoczęcia"
            type="date"
            fullWidth
            margin="normal"
            value={startDate}
            onChange={(e) => {
              const val = e.target.value;
              if (!isDateBlocked(val)) {
                setStartDate(val);
                setEndDate('');
              }
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: today }}
            error={startDate !== '' && isDateBlocked(startDate)}
            helperText={startDate !== '' && isDateBlocked(startDate) ? 'Data zajęta' : ''}
          />

          {/* Wybór daty zakończenia */}
          <TextField
            label="Data zakończenia"
            type="date"
            fullWidth
            margin="normal"
            value={endDate}
            onChange={(e) => {
              const val = e.target.value;
              if (!isDateBlocked(val)) {
                setEndDate(val);
              }
            }}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: startDate || today,
              max: startDate ? getMaxEndDate(startDate) : undefined,
            }}
            disabled={!startDate}
            error={endDate !== '' && isDateBlocked(endDate)}
            helperText={endDate !== '' && isDateBlocked(endDate) ? 'Data zajęta' : ''}
          />

          {/* Wyświetlenie kosztu */}
          {startDate && endDate && !isDateBlocked(startDate) && !isDateBlocked(endDate) && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Koszt: <strong>{calculateCost(startDate, endDate)} PLN</strong>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button
            onClick={handleClose}
            disabled={!startDate || !endDate || isDateBlocked(startDate) || isDateBlocked(endDate)}
          >
            Dokonaj wpłaty
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CarCard;
