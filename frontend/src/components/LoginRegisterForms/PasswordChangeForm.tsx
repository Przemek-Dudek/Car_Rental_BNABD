import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CasinoIcon from '@mui/icons-material/Casino';
import PasswordStrength from './PasswordStrength.tsx';
import './PasswordChangeForm.css';

type Props = {
  setUserData?: (data: { passwordChanged: boolean }) => void;
};

const PasswordChangeForm: React.FC<Props> = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'Weak' | 'Medium' | 'Strong'>('Weak');
  const [success, setSuccess] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // Prosta ocena siły hasła (możesz zmienić później)
  const evaluatePasswordStrength = (password: string) => {
    let strengthPoints = 0;
    if (password.length >= 8) strengthPoints += 1;
    if (password.length >= 12) strengthPoints += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strengthPoints += 1;
    if (/\d/.test(password)) strengthPoints += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthPoints += 1;
    if (strengthPoints < 3) return 'Weak';
    if (strengthPoints < 5) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength(evaluatePasswordStrength(value));
    if (confirmPassword) {
      setPasswordMatchError(value !== confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (newPassword) {
      setPasswordMatchError(newPassword !== value);
    }
  };

  const generatePassword = () => {
    const length = 12;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const special = '!@#$%^&*(),.?":{}|<>';
    const allChars = lowercase + uppercase + digits + special;
    const getRandomChar = (chars: string) =>
      chars[Math.floor(Math.random() * chars.length)];
    let password = '';
    password += getRandomChar(lowercase);
    password += getRandomChar(uppercase);
    password += getRandomChar(digits);
    password += getRandomChar(special);
    for (let i = 4; i < length; i++) {
      password += getRandomChar(allChars);
    }
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    setNewPassword(password);
    setConfirmPassword(password);
    setPasswordStrength(evaluatePasswordStrength(password));
    setPasswordMatchError(false);
  };

  // Usunięto logikę backendową, tylko symulacja sukcesu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setSuccess(true);
    setPasswordMatchError(false);
    // Backend i logika biznesowa zostaną dodane w przyszłości
  };

  return (
    <div className="container">
      <Box className="password-form-wrapper">
        <Typography variant="h5">
          Zmień hasło
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="input-with-button">
            <TextField
              label="Obecne hasło"
              type={showPasswords ? 'text' : 'password'}
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-input"
              required
            />
            <IconButton onClick={() => setShowPasswords((prev) => !prev)} className="icon-align">
              {showPasswords ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <div className="input-with-button">
            <TextField
              label="Nowe hasło"
              type={showPasswords ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="form-input"
            />
            <IconButton onClick={generatePassword} color="primary" className="icon-align">
              <CasinoIcon />
            </IconButton>
          </div>

          <PasswordStrength strength={passwordStrength} />

          <div className="input-with-button">
            <TextField
              label="Potwierdź nowe hasło"
              type={showPasswords ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className="form-input"
              required
              error={passwordMatchError}
              helperText={passwordMatchError ? 'Nowe hasło musi się zgadzać w obu miejscach' : ''}
            />
          </div>
          <Box className="confirm-button">
            <Button
              variant="contained"
              type="submit"
              disabled={
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            >
              Zmień hasło
            </Button>
          </Box>
        </form>

        {success && (
          <Paper elevation={0} className="form-success">
            <Typography variant="body1" color="success.main">
              Hasło zostało zmienione (symulacja frontu).
            </Typography>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default PasswordChangeForm;