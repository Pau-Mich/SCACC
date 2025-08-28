import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo_facu.png";

export default function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const handleLogout = async () => {
    try {
      // Llamada al backend para cerrar sesión
      await axios.post("http://localhost:8000/api/logout/", {}, { withCredentials: true });

      // Eliminar la sesión en el frontend
      sessionStorage.removeItem("isAuthenticated");

      // Redirigir al login
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div>
      {/* Menú toggle */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Encabezado */}
      <div className="header">
        <i className="fas fa-user-circle fa-2x text-dark"></i>
      </div>

      {/* Sidebar */}
      <div className={`sidebar${sidebarOpen ? " active" : ""}`}>
        <img src={logo} alt="logo_facultad" className="slider-image" />
        <ul>
          <li>
            <i className="fa-solid fa-house"></i>
            <Link to="/panel_admin">Principal</Link>
          </li>
          <li>
            <i className="fa-solid fa-users"></i>
            <Link to="/gestion_usuarios">Gestión usuarios</Link>
          </li>
          <li>
            <i className="fa-solid fa-file-lines"></i>
            <Link to="/reportes">Reportes</Link>
          </li>
          <li>
            <i className="fa-solid fa-calendar-days"></i>
            <Link to="/reservacion">Reservaciones</Link>
          </li>
          <li>
            <i className="fa-solid fa-computer-mouse"></i>
            <Link to="/prestamos_main">Préstamos</Link>
          </li>
          <li>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <button
              onClick={handleLogout}
              className="btn btn-link p-0 text-start"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Salida
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
