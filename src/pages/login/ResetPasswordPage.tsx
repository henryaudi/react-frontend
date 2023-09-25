import React, { useState, FormEvent, ReactElement } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";

import AuthService from "../../services/auth";

function ResetPasswordPage(): ReactElement {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { token } = useParams<{token: string}>();

    

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setEdit(true);
    
        if (newPassword.length > 0 && newPassword.length < 5) {
            setErrorMessage("Password must be at least 5 characters long");
        } else {
            setErrorMessage("");
        }
    }
    
    const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword2 = e.target.value;
        setPassword2(newPassword2);
        setEdit2(true);
    
        if (newPassword2.length > 0 && newPassword2 !== password) {
            setErrorMessage2("Passwords do not match");
        } else {
            setErrorMessage2("");
        }
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!!errorMessage || !!errorMessage2) { return; }
        
        setLoading(true);

        try {
            // Reset password.
            await AuthService.resetPassword(token + "", password);
        } catch (error) {
            if (error instanceof Error) { setErrorMessage(error.message); }
            else { throw error; }
        } finally {
            setLoading(false);
            setPassword("");
            setPassword2("");
            alert("Password updated successfully!");
            navigate('/');
        }
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 8,
                }}
            >
                <Typography component="h1" variant="h5">
                    {" "}
                    Reset Password{" "}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={edit && !!errorMessage}
                        helperText= {edit ? errorMessage : ""}
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        value={password2}
                        onChange={handlePassword2Change}
                        autoComplete="current-password"
                        error={edit2 && !!errorMessage2}
                        helperText= {edit2 ? errorMessage2 : ""}
                    />
                    <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        loading={loading}
                        sx={{ mt: 4, mb: 3 }}
                    >
                        Reset Password
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPasswordPage;
