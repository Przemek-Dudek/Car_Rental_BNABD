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
import { addCar } from '../../shared/carApi';

const steps = ['Marka i model', 'Numer rejestracyjny i rocznik', 'Cena, status i segment', 'Daty przeglądu i ubezpieczenia'];

export interface CarDto {
  brand: string;
  model: string;
  year: string;
  plateNumber: string;
  pricePerDay: string;
  status: string;
  segment: string;
  imageLink: string;
  endOfInspectionDate: string;
  endOfInsuranceDate: string;
}

const CarAddForm: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [carData, setCarData] = React.useState<CarDto>({
    brand: '',
    model: '',
    year: '',
    plateNumber: '',
    pricePerDay: '',
    status: 'AVAILABLE',
    segment: 'A',
    imageLink: '',
    endOfInspectionDate: '',
    endOfInsuranceDate: '',
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
      plateNumber: '',
      pricePerDay: '',
      status: 'AVAILABLE',
      segment: 'A',
      imageLink: '',
      endOfInspectionDate: '',
      endOfInsuranceDate: '',
    });
  };

  const handleSubmit = async () => {
    setFinished(true);
    setErrorMessage(null);
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setErrorMessage('Brak uprawnień. Zaloguj się jako administrator.');
      return;
    }
    try {
      await addCar(carData, accessToken!);
      setFinished(true);
    } catch (e) {
      setErrorMessage('Błąd podczas dodawania auta.');
    }
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
                className="step-input"
              >
                {['A', 'B', 'C', 'D', 'E', 'F', 'J', 'M', 'S'].map(seg => (
                  <MenuItem key={seg} value={seg}>{seg}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Link do zdjęcia"
                fullWidth
                value={carData.imageLink}
                onChange={(e) => setCarData((prev) => ({ ...prev, imageLink: e.target.value }))}
                className="step-input"
              />
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
                value={carData.plateNumber}
                onChange={(e) => setCarData((prev) => ({ ...prev, plateNumber: e.target.value }))}
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
                <Button onClick={handleNext} variant="contained" disabled={!carData.plateNumber || !carData.year}>
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
                value={carData.pricePerDay}
                onChange={(e) => setCarData((prev) => ({ ...prev, pricePerDay: e.target.value }))}
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
                <MenuItem value="UNAVAILABLE">Nieaktywny</MenuItem>
              </TextField>
              <div className="step-buttons">
                <Button onClick={handleBack}>Wstecz</Button>
                <Button onClick={handleNext} variant="contained" disabled={!carData.pricePerDay}>
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
                value={carData.endOfInspectionDate}
                onChange={(e) => setCarData((prev) => ({ ...prev, endOfInspectionDate: e.target.value }))}
                className="step-input"
              />
              <TextField
                label="Ubezpieczenie ważne do"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={carData.endOfInsuranceDate}
                onChange={(e) => setCarData((prev) => ({ ...prev, endOfInsuranceDate: e.target.value }))}
                className="step-input"
              />
              <div className="step-buttons">
                <Button onClick={handleBack}>Wstecz</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" disabled={!carData.endOfInspectionDate || !carData.endOfInsuranceDate}>
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