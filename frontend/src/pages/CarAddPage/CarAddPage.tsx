import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarAddForm from '../../components/CarAddForm/CarAddForm';

const CarAddPage: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('user_role');

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/home');
    }
  }, [role, navigate]);
  
  if (role !== 'ADMIN') return <div>Brak dostępu</div>;

  return (
	<div className='car-add-page'>
        <CarAddForm />
	</div>
  );
};

export default CarAddPage;
