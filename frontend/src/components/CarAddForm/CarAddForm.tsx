import * as React from 'react';
import './CarAddForm.css';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';

const steps = ['Marka i model', 'Numer rejestracyjny i rocznik', 'Cena, status i segment', 'Daty przeglądu i ubezpieczenia'];

interface CarDto {
  brand: string;
  model: string;
  year: string;
  plate_number: string;
  price_per_day: string;
  status: 'AVAILABLE' | 'RENTED' | 'INACTIVE';
  segment: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'J' | 'M' | 'S';
  przeglad_end: string;
  ubezpieczenie_end: string;
}

const CarAddForm: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [carData, setCarData] = React.useState<CarDto>({
    brand: '',
    model: '',
    year: '',
    plate_number: '',
    price_per_day: '',
    status: 'AVAILABLE',
    segment: 'A',
    przeglad_end: '',
    ubezpieczenie_end: '',
  });

  const [finished, setFinished] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setFinished(false);
    setErrorMessage(null);
    setCarData({
      brand: '',
      model: '',
      year: '',
      plate_number: '',
      price_per_day: '',
      status: 'AVAILABLE',
      segment: 'A',
      przeglad_end: '',
      ubezpieczenie_end: '',
    });
  };

  const handleSubmit = async () => {
    setFinished(true);
    setErrorMessage(null);
    //dodac tu kiedys sprawdzanie czy taka rejestracja juz istnieje
  };

  return (
    <div className="container">
      <Box className="stepper-wrapper">
        <h1>Add a New Car</h1>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Marka i model</StepLabel>
            <StepContent>
              <TextField
                label="Marka"
                fullWidth
                value={carData.brand}
                onChange={(e) => setCarData((prev) => ({ ...prev, brand: e.target.value }))}
                className="step-input"
              />
              <TextField
                label="Model"
                fullWidth
                value={carData.model}
                onChange={(e) => setCarData((prev) => ({ ...prev, model: e.target.value }))}
                className="step-input"
              />
            <TextField
                select
                label="Segment"
                fullWidth
                value={carData.segment}
                onChange={(e) => setCarData((prev) => ({ ...prev, segment: e.target.value as CarDto['segment'] }))}
              >
                {['A', 'B', 'C', 'D', 'E', 'F', 'J', 'M', 'S'].map(seg => (
                  <MenuItem key={seg} value={seg}>{seg}</MenuItem>
                ))}
              </TextField>
              <div className="step-buttons">
                <Button onClick={handleNext} variant="contained" disabled={!carData.brand || !carData.model}>
                  Dalej
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Numer rejestracyjny i rocznik</StepLabel>
            <StepContent>
              <TextField
                label="Numer rejestracyjny"
                fullWidth
                value={carData.plate_number}
                onChange={(e) => setCarData((prev) => ({ ...prev, plate_number: e.target.value }))}
                className="step-input"
              />
              <TextField
                label="Rok produkcji"
                type="number"
                fullWidth
                value={carData.year}
                onChange={(e) => setCarData((prev) => ({ ...prev, year: e.target.value }))}
                className="step-input"
              />
              <div className="step-buttons">
                <Button onClick={handleBack}>Wstecz</Button>
                <Button onClick={handleNext} variant="contained" disabled={!carData.plate_number || !carData.year}>
                  Dalej
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Cena, status i segment</StepLabel>
            <StepContent>
              <TextField
                label="Cena za dzień (PLN)"
                type="number"
                fullWidth
                value={carData.price_per_day}
                onChange={(e) => setCarData((prev) => ({ ...prev, price_per_day: e.target.value }))}
                className="step-input"
              />
              <TextField
                select
                label="Status"
                fullWidth
                value={carData.status}
                onChange={(e) => setCarData((prev) => ({ ...prev, status: e.target.value as CarDto['status'] }))}
              >
                <MenuItem value="AVAILABLE">Dostępny</MenuItem>
                <MenuItem value="RENTED">Wynajęty</MenuItem>
                <MenuItem value="INACTIVE">Nieaktywny</MenuItem>
              </TextField>
              <div className="step-buttons">
                <Button onClick={handleBack}>Wstecz</Button>
                <Button onClick={handleNext} variant="contained" disabled={!carData.price_per_day}>
                  Dalej
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Daty przeglądu i ubezpieczenia</StepLabel>
            <StepContent>
              <TextField
                label="Przegląd ważny do"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={carData.przeglad_end}
                onChange={(e) => setCarData((prev) => ({ ...prev, przeglad_end: e.target.value }))}
                className="step-input"
              />
              <TextField
                label="Ubezpieczenie ważne do"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={carData.ubezpieczenie_end}
                onChange={(e) => setCarData((prev) => ({ ...prev, ubezpieczenie_end: e.target.value }))}
                className="step-input"
              />
              <div className="step-buttons">
                <Button onClick={handleBack}>Wstecz</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" disabled={!carData.przeglad_end || !carData.ubezpieczenie_end}>
                  Zakończ
                </Button>
              </div>
            </StepContent>
          </Step>
        </Stepper>
        {errorMessage && (
          <Paper square elevation={0} className="step-incomplete">
            <Typography color="error">{errorMessage}</Typography>
          </Paper>
        )}
        {finished && (
          <Paper square elevation={0} className="step-complete">
            <Typography color="success.main">
              Samochód <strong>{carData.brand} {carData.model}</strong> został dodany!
            </Typography>
            <Button onClick={handleReset} variant="outlined" sx={{ mt: 2 }}>
              Dodaj kolejny
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default CarAddForm;
