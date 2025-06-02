import React, {useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Link,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './LoginForm.css';
import {registerPagePath} from '../../shared/pagesPaths';
import {apiRequest} from '../../shared/APIManagement'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiRequest("POST", "auth/authenticate", {
                email,
                password,
            });

            const data = await response.json();
            console.log("Access Token:", data.access_token);
            console.log("Refresh Token:", data.refresh_token);

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            window.location.href = "/home";
        } catch (error) {
            alert("Invalid credentials. Please try again.");
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="container">
            <Box className="password-form-wrapper">
                <Typography variant="h5">
                    Zaloguj się
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className="input-with-button">
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="input-with-button">
                        <TextField
                            label="Hasło"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                        <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="icon-align"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </div>
                    <div className="input-with-button">
                        <Typography variant="body2" align="center" sx={{mb: 2}}>
                            <Link href={registerPagePath} underline="hover">
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
                            disabled={!email || !password}
                        >
                            Zaloguj
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
};

export default LoginForm;
