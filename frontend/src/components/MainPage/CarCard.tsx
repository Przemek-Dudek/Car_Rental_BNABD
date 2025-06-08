import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CarCard.css';
import { useNavigate } from 'react-router-dom';

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

interface CarCardProps {
  car: CarData;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card className="car-card">
      <CardMedia
        className="car-card__media"
        image={car.image}
        title={`${car.brand} ${car.model}`}
      />
      <CardContent className="car-card__content">
        <Typography variant="h6" component="div" className="car-card__title">
          {car.brand} {car.model} ({car.year})
        </Typography>
        <Typography variant="body2" className="car-card__description">
          {car.segment} • {car.status === 'AVAILABLE' ? 'Dostępny' : car.status === 'RENTED' ? 'Wynajęty' : 'Nieaktywny'} • {car.plate_number}
        </Typography>
        <Typography variant="body2" className="car-card__info">
          Cena: <strong>{car.price_per_day} PLN/dzień</strong>
        </Typography>
        <Typography variant="body2" className="car-card__info">
          Przegląd do: {car.przeglad_wazny_koniec}
        </Typography>
        <Typography variant="body2" className="car-card__info">
          Ubezpieczenie do: {car.ubezpieczenie_koniec}
        </Typography>
      </CardContent>
      <CardActions className="car-card__actions">
          <Button size="small" disabled={car.status !== 'AVAILABLE'}>
            Wypożycz
          </Button>
      </CardActions>
    </Card>
  );
};

export default CarCard;
