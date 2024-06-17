import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState(""); // Nuevo estado para el mensaje de bienvenida
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Resetear el mensaje de error
    setWelcomeMessage(""); // Resetear el mensaje de bienvenida
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      // Asumiendo que la respuesta del servidor incluye un objeto "user" con un atributo "name"
      if (response.data && response.data.user) {
        setWelcomeMessage(`Bienvenido ${response.data.user.name}`);
        setTimeout(() => {
          navigate("/dashboard"); // Redirigir después de mostrar el mensaje de bienvenida
        }, 2000); // Esperar 2 segundos antes de redirigir
      }
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango de 2xx
        console.error("Login error:", error.response.data);
        setError(error.response.data.message); // Mostrar el mensaje de error desde el servidor
      } else {
        console.error("Error", error.message);
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white", // Fondo blanco
        padding: 3, // Espacio interior para no estar pegado a los bordes
        borderRadius: "8px", // Bordes redondeados
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.2)", // Sombra suave
        marginTop: 8, // Ajustar según necesidades visuales
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color={"black"}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ width: "90%", mt: 2 }}>
              {error}
            </Alert>
          )}
          {welcomeMessage && (
            <Alert severity="success" sx={{ width: "90%", mt: 2 }}>
              {welcomeMessage}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
