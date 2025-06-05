import React from 'react';
import './UsersRentingsPage.css';
import UsersRentingsGrid from '../../components/UsersRentingsPage/UsersRentingsGrid';

const UsersRentingsPage: React.FC = () => {
  return (
	<div className="users-rentings-page">
	  <h1>My reservations</h1>
	  	<UsersRentingsGrid/>
	</div>
  );
};

export default UsersRentingsPage;
