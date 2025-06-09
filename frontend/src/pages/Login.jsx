import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import logo from "../images/logo.png";      // Adjust the path as needed
import persona from "../images/card_human.png"; // Adjust the path as needed
import fondo from "../images/fondo.png";     // Adjust the path as needed
import "../styles/login-styles.css"; // Adjust the path as needed

export default function Login() {
  const [id_usuario, setIdUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        id_usuario: id_usuario,
        contrasenia: contrasenia,
      });

      if (response.status === 200) {
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        navigate("/Panel_admin");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error en el servidor");
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
      {/* Aquí va el contenido, incluyendo header, login-card, etc. */}
   


      {/* Header */ }
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

  {/* Imagen persona */ }
  <img src={persona} alt="Persona con laptop" className="persona-img" />

  {/* Login card */ }
  <div className="login-card">
    <h2>¡BIENVENIDO!</h2>
    <p>Empieza a gestionar</p>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="No. empleado"
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
      <button type="submit">Iniciar sesión</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>

    <div className="help-container">
      <button type="button" className="help-button" onClick={toggleHelp}>
        <i className="fas fa-question-circle"></i>
      </button>
      <div className="help-text" id="helpText" style={{ display: "none" }}>
        Si se desea crear una cuenta o cambiar tu contraseña actual,
        dirígete al centro de cómputo para solicitar el trámite.
      </div>
    </div>
  </div>

  {/* Footer */ }
  <footer>
    <div className="barra-inferior"></div>
    <p>Apizaquito, 20 de noviembre, 90401 Cd. de Apizaco, Tlax.</p>
  </footer>
    </div >
     
  );
}