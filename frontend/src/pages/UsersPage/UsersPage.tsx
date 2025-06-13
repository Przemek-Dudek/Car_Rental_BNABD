import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersDataGrid from '../../components/UsersPage/UsersDataGrid';
import './UsersPage.css';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('user_role');

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/home');
    }
  }, [role, navigate]);

  if (role !== 'ADMIN') return <div>Brak dostępu</div>;

  return (
	<div className="users-page">
	  <h1>Users Page</h1>
      <UsersDataGrid />
	</div>
  );
};

export default UsersPage;
