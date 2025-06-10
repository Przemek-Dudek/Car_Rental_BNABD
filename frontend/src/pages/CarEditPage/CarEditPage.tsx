import React from 'react';
import './CarEditPage.css';
import CarsDataGrid from '../../components/CarEditForm/CarsDataGrid';

const CarEditPage: React.FC = () => {
  return (
    <div className="car-edit-page">
      <h1>Edycja samochodów</h1>
      <CarsDataGrid />
    </div>
  );
};

export default CarEditPage;