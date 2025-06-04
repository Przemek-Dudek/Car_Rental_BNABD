import React from 'react';
import ReservationDataGrid from '../../components/ReservationPage/ReservationsDataGrid';
import './ReservationPage.css';

const ReservationPage: React.FC = () => {
  return (
	<div className="reservations-page">
	  <h1>Reservations Page</h1>
      <ReservationDataGrid />
	</div>
  );
};

export default ReservationPage;
