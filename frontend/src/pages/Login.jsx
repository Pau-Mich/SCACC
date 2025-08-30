import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import persona from "../images/card_human.png";
import fondo from "../images/fondo.png";
import "../styles/login-styles.css";

export default function Login() {
  const [id_usuario, setIdUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Intenta con el endpoint /api/login/ primero
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { 
          id_usuario: id_usuario, 
          contrasenia: contrasenia 
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        // Guardar información en sessionStorage
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("usuario_id", id_usuario);
        
        // Redirigir al panel de administración
        navigate("/Panel_admin");
      }
    } catch (err) {
      // Si falla, intenta con /login/ como respaldo
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login/",
          { 
            id_usuario: id_usuario, 
            contrasenia: contrasenia 
          },
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.status === 200) {
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("usuario_id", id_usuario);
          navigate("/Panel_admin");
        }
      } catch (err2) {
        // Manejo de errores
        if (err2.response) {
          setError(err2.response.data?.error || `Error ${err2.response.status}`);
        } else if (err2.request) {
          setError("No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.");
        } else {
          setError("Error inesperado: " + err2.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleHelp = () => {
    const helpText = document.getElementById("helpText");
    if (helpText) {
      helpText.style.display =
        helpText.style.display === "block" ? "none" : "block";
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      {/* Header */}
      <header>
        <div className="logo-container">
          <img src={logo} alt="Logo UATX" className="logo" />
          <div className="university-name">
            UNIVERSIDAD AUTÓNOMA
            <br /> DE TLAXCALA
          </div>
        </div>
        <div className="info-superior">
          <div><i className="fas fa-phone-alt"></i> 241 160 3461</div>
          <div><i className="fab fa-facebook-f"></i> FCBIyT</div>
        </div>
      </header>

      {/* Imagen persona */}
      <img src={persona} alt="Persona con laptop" className="persona-img" />

      {/* Login card */}
      <div className="login-card">
        <h2>¡BIENVENIDO!</h2>
        <p>Empieza a gestionar</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Número de empleado"
            value={id_usuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <div className="help-container">
          <button type="button" className="help-button" onClick={toggleHelp}>
            <i className="fas fa-question-circle"></i>
          </button>
          <div className="help-text" id="helpText" style={{ display: "none" }}>
            Ingrese la clave única de los administradores.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="barra-inferior"></div>
        <p>Apizaquito, 20 de noviembre, 90401 Cd. de Apizaco, Tlax.</p>
      </footer>
    </div>
  );
}