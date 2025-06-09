import React, { useState } from "react";
import "../styles/prestamos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import officeDesk from "../images/office-desk.png";
import { Link } from "react-router-dom";
import Menu from "./menu";

/**
 * Componente AgregarDispositivo
 * Permite al usuario agregar un nuevo dispositivo al sistema mediante un formulario.
 * Incluye un menú lateral, navegación y retroalimentación visual de éxito/error.
 */
const AgregarDispositivo = () => {
  // Estado para controlar la visibilidad del sidebar
  // Estado que guarda los datos del formulario
  const [formData, setFormData] = useState({
    numero_dispositivo: "",
    numero_serie: "",
    tipo: "",
    marca: "",
    modelo: "",
  });
  // Estado para mostrar mensajes de retroalimentación al usuario
  const [mensaje, setMensaje] = useState("");

  /**
   * Actualiza el estado del formulario conforme se escriben los datos.
   * @param {Object} e - Evento de cambio del input.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Envía los datos del formulario para registrar un nuevo dispositivo.
   * Realiza validación de campos obligatorios antes de enviar.
   * Si el registro es exitoso, muestra mensaje de éxito y limpia el formulario.
   * Si hay error, muestra mensaje correspondiente.
   * @param {Object} e - Evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.numero_dispositivo ||
      !formData.numero_serie ||
      !formData.tipo
    ) {
      setMensaje("Por favor llena los campos obligatorios.");
      return;
    }

    fetch("http://localhost:8000/agregar_dispositivo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        num_serie: parseInt(formData.numero_serie), 
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.mensaje) {
          setMensaje(res.mensaje);
          setFormData({
            numero_dispositivo: "",
            numero_serie: "",
            tipo: "",
            marca: "",
            modelo: "",
          });
        } else {
          setMensaje(res.error);
        }
      })
      .catch((error) => {
        setMensaje(" Error al conectar con el servidor."), error;
      });
  };

  return (
    <div>
      {/* Botón para toggle del menú */}
      < Menu />

      {/* Contenido principal */}
      <main className="main-content">
        <h1>Préstamos</h1>
        <div className="usuario-header">
          <span>Patricia Trejo Sánchez</span>
        </div>

        {/* Sección de dispositivos */}
        <div className="seccion-dispositivos">
          <div className="dispositivos-actuales">
            <img
              src={officeDesk}
              alt="img_prestamo"
              className="slider-image"
              width="200"
              height="200"
            />
            <h2>Dispositivos actuales</h2>
            <Link to="/agregar_dispositivo">Agregar dispositivo</Link>
            <Link to="/eliminar_dispositivo">Eliminar dispositivo</Link>
          </div>

          <form className="formulario-agregar" onSubmit={handleSubmit}>
            <h3>Agregar dispositivo</h3>

            <input
              type="text"
              name="numero_dispositivo"
              placeholder="Número de dispositivo"
              value={formData.numero_dispositivo}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="numero_serie"
              placeholder="Número de serie"
              value={formData.numero_serie}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="tipo"
              placeholder="Tipo de dispositivo"
              value={formData.tipo}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={formData.marca}
              onChange={handleChange}
            />

            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={formData.modelo}
              onChange={handleChange}
            />

            <button type="submit">Agregar</button>

            {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};
export default AgregarDispositivo;
