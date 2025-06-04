import React, {useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CasinoIcon from '@mui/icons-material/Casino';
import PasswordStrength from './PasswordStrength.tsx';
import './RegisterForm.css';
import {loginPagePath} from '../../shared/pagesPaths.ts';
import {apiRequest} from "../../shared/APIManagement.ts";

const RegisterForm: React.FC = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<'Weak' | 'Medium' | 'Strong'>('Weak');
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setUserData(prev => ({...prev, [field]: value}));
        if (field === 'password') {
            setPasswordStrength(evaluatePasswordStrength(value));
            if (userData.confirmPassword) {
                setPasswordMatchError(value !== userData.confirmPassword);
            }
        }
        if (field === 'confirmPassword') {
            setPasswordMatchError(userData.password !== value);
        }
    };

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
        setUserData(prev => ({
            ...prev,
            password,
            confirmPassword: password
        }));
        setPasswordStrength(evaluatePasswordStrength(password));
        setPasswordMatchError(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiRequest("POST", "auth/register", {
                firstname: userData.name,
                lastname: userData.surname,
                email: userData.email,
                password: userData.password,
                role: "USER"
            });

            const data = await response.json();
            console.log("Access Token:", data.access_token);
            console.log("Refresh Token:", data.refresh_token);

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            window.location.href = "/home";

        } catch (error) {
            alert("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return (
        <Box className="password-form-wrapper">
            <Typography variant="h5">
                Zarejestruj się
            </Typography>
            <form onSubmit={handleSubmit}>
                <div className="input-with-button">
                    <TextField
                        label="Imię"
                        fullWidth
                        variant="outlined"
                        value={userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="input-with-button">

                    <TextField
                        label="Nazwisko"
                        fullWidth
                        variant="outlined"
                        value={userData.surname}
                        onChange={(e) => handleInputChange('surname', e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="input-with-button">
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <TextField
                        label="Hasło"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        value={userData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                ),
                            },
                        }}
                    />
                    <IconButton onClick={generatePassword} color="primary">
                        <CasinoIcon/>
                    </IconButton>
                </Box>

                <PasswordStrength strength={passwordStrength}/>
                <div className="input-with-button">
                    <TextField
                        label="Powtórz hasło"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={userData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="form-input"
                        required
                        error={passwordMatchError}
                        helperText={passwordMatchError ? 'Hasła muszą być identyczne' : ''}
                    />
                </div>
                <div className="input-with-button">
                    <Typography variant="body2" align="center" sx={{mb: 2}}>
                        <Link href={loginPagePath} underline="hover">
                            Posiadam konto, chcę się zalogować
                        </Link>
                    </Typography>
                </div>
                <Box className="confirm-button">
                    <Button
                        variant="outlined"
                        href="/home"
                    >
                        Powrót
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={
                            !userData.name ||
                            !userData.surname ||
                            !userData.email ||
                            !userData.password ||
                            !userData.confirmPassword ||
                            passwordMatchError
                        }
                    >
                        Zarejestruj
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default RegisterForm;
