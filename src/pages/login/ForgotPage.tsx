import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Box, FormHelperText } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import AuthService from "../../services/auth";

function ForgotPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        AuthService.forgotPassword(email).then(
            () => {
                setLoading(false);
                setEmail("");
                alert("Check your email!");
                navigate("/");
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.error) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setLoading(false);
            }
        );
    }    

    return (
        <Box
            style={{
                display: "grid",
                gridAutoRows: "auto",
                gap: 1,
                justifyContent: "center",
            }}
        >
            <h1>Reset your password?</h1>
            <p style={{ color: "grey" }}>
                Enter your email address below and we'll send you a reset link.
            </p>

            <Box component="form" onSubmit={handleSubmit} style={{ display: "grid", marginTop: "2em" }}>
                <TextField
                    id="outlined-basic"
                    label="Email Address"
                    variant="outlined"
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={loading}
                        sx={{ mt: 4, mb: 3 }}
                    ></LoadingButton> */}
                <LoadingButton
                    type="submit"
                    style={{ marginTop: "1em", borderRadius: "10px" }}
                    variant="contained"
                    loading={loading}
                    disableElevation
                >
                    SEND RESET LINK
                </LoadingButton>
                <FormHelperText>{message}</FormHelperText>
            </Box>
        </Box>
    );
}

export default ForgotPage;
