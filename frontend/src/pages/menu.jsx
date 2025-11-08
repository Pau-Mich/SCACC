import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_facu.png";

export default function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

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
            <Link to="/">Salida</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}