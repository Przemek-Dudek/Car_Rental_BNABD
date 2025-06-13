import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';import ReservationDataGrid from '../../components/ReservationPage/ReservationsDataGrid';
import './ReservationPage.css';

const ReservationPage: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('user_role');

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/home');
    }
  }, [role, navigate]);
  
  if (role !== 'ADMIN') return <div>Brak dostępu</div>;

  return (
	<div className="reservations-page">
	  <h1>Reservations Page</h1>
      <ReservationDataGrid />
	</div>
  );
};

export default ReservationPage;
