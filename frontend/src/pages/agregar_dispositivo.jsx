import React, { useState, useEffect } from "react";
import "../styles/prestamos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Menu from "./menu";

import Menu_dispositivos from "../pages/menu_dispositivos";

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
  const [mensaje, setMensaje] = useState("");
  // Estado para mostrar mensajes de retroalimentación al usuario
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
      }, 2000); // 2 segundos

      // Limpia el temporizador si el componente se desmonta o mensaje cambia
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

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
          <Menu_dispositivos />

          <form className="formulario-agregar" onSubmit={handleSubmit}>
            <h3>Agregar dispositivo</h3>
            Número de dispositivo:
            <input
              type="text"
              name="numero_dispositivo"
              placeholder="Número de dispositivo"
              maxLength={2}
              value={formData.numero_dispositivo}
              onChange={handleChange}
              required
            />
            Número de serie:
            <input
              type="text"
              name="numero_serie"
              placeholder="Número de serie"
              value={formData.numero_serie}
              maxLength={16}
              onChange={handleChange}
              required
            />
            Tipo de dispositivo:
            <select
              className="form-select"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Cañon">Cañon de proyección</option>
              <option value="Mouse">Mouse</option>
              <option value="Bocina">Bocina</option>
              <option value="Teclado">Teclado</option>
              <option value="Monitor">Monitor</option>
              <option value="Cable HDMI">Cable HDMI</option>
              <option value="Cable VGA">Cable VGA</option>
              <option value="Cable USB">Cable USB</option>

            </select>
            Marca:
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              required
              value={formData.marca}
              onChange={handleChange}
            />
            Modelo:
            <input
              type="text"
              name="modelo"
              maxLength={4}
              placeholder="Modelo"
              value={formData.modelo}
              required
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
