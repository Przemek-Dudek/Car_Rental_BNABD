import React from 'react';
import './LoginPage.css'; // Assuming you have a CSS file for styling
import LoginForm from '../../components/LoginRegisterForms/LoginForm';


const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
