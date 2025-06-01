import React, { useState } from "react";
import "./RegisterForm.css";
import {mainPagePath} from "../../shared/pagesPaths.ts";

const RegisterForm: React.FC = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password,
                    role: "USER"
                }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            console.log("Access Token:", data.access_token);
            console.log("Refresh Token:", data.refresh_token);

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            window.location.href = mainPagePath;

        } catch (error) {
            console.error("Registration failed:", error);
            setError("Failed to register. Please check your details and try again.");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
