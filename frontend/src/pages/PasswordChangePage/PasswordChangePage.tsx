import React from 'react';
import './PasswordChangePage.css'; // Assuming you have a CSS file for styling
import PasswordChangeForm from '../../components/LoginRegisterForms/PasswordChangeForm';

const PasswordChangePage: React.FC = () => {
    return (
        <div className="password-change-page">
            <PasswordChangeForm />
        </div>
    );
};

export default PasswordChangePage;
