import React from 'react';
import RegisterForm from '../../components/LoginRegisterForms/RegisterForm';
import './RegisterPage.css'; // Assuming you have a CSS file for stylin

const RegisterPage: React.FC = () => {
  return (
	<div className="register-page">
        <RegisterForm />
	</div>
  );
};

export default RegisterPage;
