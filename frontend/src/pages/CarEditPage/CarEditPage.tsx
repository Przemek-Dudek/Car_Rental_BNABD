import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarEditPage.css';
import CarsDataGrid from '../../components/CarEditForm/CarsDataGrid';

const CarEditPage: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('user_role');

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/home');
    }
  }, [role, navigate]);

  if (role !== 'ADMIN') return <div>Brak dostępu</div>;

  return (
    <div className="car-edit-page">
      <h1>Edycja samochodów</h1>
      <CarsDataGrid />
    </div>
  );
};

export default CarEditPage;