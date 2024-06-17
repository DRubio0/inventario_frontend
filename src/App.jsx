import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Iniciar sesión
            </Button>
          )}
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
