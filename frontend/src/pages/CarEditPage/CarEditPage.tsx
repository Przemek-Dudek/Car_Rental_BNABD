import React, { useState } from 'react';
import './CarEditPage.css';
import CarsDataGrid, { type CarData } from '../../components/CarEditForm/CarsDataGrid';
import CarEditForm, { type CarEditData } from '../../components/CarEditForm/CarEditForm';

const CarEditPage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<CarEditData | null>(null);

  const handleEditClick = (car: CarData) => {
    const carEditData: CarEditData = {
      brand: car.brand,
      model: car.model,
      year: car.year.toString(),
      plate_number: car.plate_number,
      price_per_day: car.price_per_day.toString(),
      status: car.status,
      segment: car.segment as CarEditData["segment"],
      przeglad_end: car.przeglad_wazny_koniec,
      ubezpieczenie_end: car.ubezpieczenie_koniec,
      image: car.image
    };
    setSelectedCar(carEditData);
  };

  const handleSave = (data: CarEditData) => {
    console.log("Zapisano zmiany:", data);
    // Można tutaj zapisać do API
  };

  const handleBack = () => {
    setSelectedCar(null);
  };

  return (
    <div className="car-edit-page">
      <h1>Car Edit Page</h1>
      <CarsDataGrid onEdit={handleEditClick} />
      {selectedCar && (
        <CarEditForm
          initialData={selectedCar}
          onSave={handleSave}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default CarEditPage;
