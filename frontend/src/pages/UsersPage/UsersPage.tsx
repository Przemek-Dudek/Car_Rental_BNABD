import React from 'react';
import UsersDataGrid from '../../components/UsersPage/UsersDataGrid';
import './UsersPage.css';

const UsersPage: React.FC = () => {
  return (
	<div className="users-page">
	  <h1>Users Page</h1>
      <UsersDataGrid />
	</div>
  );
};

export default UsersPage;
