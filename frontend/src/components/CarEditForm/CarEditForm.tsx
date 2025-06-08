import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';
import './CarEditForm.css';

export interface CarEditData {
  brand: string;
  model: string;
  year: string;
  plate_number: string;
  price_per_day: string;
  status: 'AVAILABLE' | 'RENTED' | 'INACTIVE';
  segment: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'J' | 'M' | 'S';
  przeglad_end: string;
  ubezpieczenie_end: string;
  image: string;
}

interface CarEditFormProps {
  initialData: CarEditData;
  onSave: (data: CarEditData) => void;
  onBack: () => void;
}

const CarEditForm: React.FC<CarEditFormProps> = ({ initialData, onSave, onBack }) => {
  const [carData, setCarData] = useState<CarEditData>({ ...initialData });
  const [success, setSuccess] = useState(false);

 useEffect(() => {
    setCarData({ ...initialData });
    setSuccess(false);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    onSave(carData);
    // Backend i logika biznesowa zostaną dodane w przyszłości
  };

  return (
    <div className="container">
      <Box className="login-form-wrapper">
        <Typography variant="h5" gutterBottom>
          Edytuj samochód
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Marka"
            name="brand"
            value={carData.brand}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Model"
            name="model"
            value={carData.model}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rok produkcji"
            name="year"
            type="number"
            value={carData.year}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 1900, max: 2100 }}
          />
          <TextField
            label="Numer rejestracyjny"
            name="plate_number"
            value={carData.plate_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cena za dzień (PLN)"
            name="price_per_day"
            type="number"
            value={carData.price_per_day}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 0 }}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={carData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="AVAILABLE">Dostępny</MenuItem>
            <MenuItem value="RENTED">Wynajęty</MenuItem>
            <MenuItem value="INACTIVE">Nieaktywny</MenuItem>
          </TextField>
          <TextField
            select
            label="Segment"
            name="segment"
            value={carData.segment}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {['A', 'B', 'C', 'D', 'E', 'F', 'J', 'M', 'S'].map(seg => (
              <MenuItem key={seg} value={seg}>{seg}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Przegląd ważny do"
            name="przeglad_end"
            type="date"
            value={carData.przeglad_end}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Ubezpieczenie ważne do"
            name="ubezpieczenie_end"
            type="date"
            value={carData.ubezpieczenie_end}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="URL zdjęcia"
            name="image"
            value={carData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={onBack}>
              Wróć
            </Button>
            <Button variant="contained" type="submit">
              Zapisz
            </Button>
          </Box>
        </form>
        {success && (
          <Paper elevation={0} className="form-success" sx={{ mt: 2, p: 1 }}>
            <Typography variant="body1" color="success.main">
              Zmiany zapisane (symulacja frontu).
            </Typography>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default CarEditForm;