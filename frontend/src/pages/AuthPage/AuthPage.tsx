import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { Dialog, DialogContent, Tabs, Tab, Box } from "@mui/material";

const AuthPage: React.FC<{ open?: boolean; onClose?: () => void }> = ({ open = true, onClose = () => {} }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Box>
                    <Tabs
                        value={tabIndex}
                        onChange={(event, newIndex) => setTabIndex(newIndex)}
                        TabIndicatorProps={{
                            style: { backgroundColor: "#568203" }
                        }}
                    >
                        <Tab label="Login"/>
                        <Tab label="Register"/>
                    </Tabs>
                </Box>
                {tabIndex === 0 ? <LoginForm /> : <RegisterForm />}
            </DialogContent>
        </Dialog>
    );
};

export default AuthPage;