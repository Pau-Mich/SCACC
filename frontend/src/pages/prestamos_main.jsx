import React, { useState, useEffect } from "react";
import "../styles/prestamos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import officeDesk from "../images/office-desk.png";
import { Link } from "react-router-dom";
import Menu from "./menu";

const PrestamosMain = () => {
  // Estado para almacenar los dispositivos disponibles
  const [dispositivosDisponibles, setDispositivosDisponibles] = useState([]);
  // Estado para mostrar mensajes al usuario
  const [mensaje, setMensaje] = useState("");
  // Estado para almacenar los dispositivos que están prestados
  const [dispositivosPrestados, setDispositivosPrestados] = useState([]);

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    numero_empleado: "",
    numero_serie: "",
    hora_inicio: "",
    hora_fin: "",
    motivo: "",
  });

  // useEffect para obtener los dispositivos al montar el componente y refrescar cada 60 segundos
  useEffect(() => {
    obtenerDispositivos();
    const intervalo = setInterval(() => {
      obtenerDispositivos();
    }, 60000); // cada 60 segundos

    // Limpiar intervalo cuando se desmonta el componente
    return () => clearInterval(intervalo);
  }, []);

  // Función para actualizar el estado del formulario conforme el usuario escribe
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario de préstamo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { numero_empleado, numero_serie, hora_inicio } = formData;
    // Validar campos obligatorios
    if (!numero_empleado || !numero_serie || !hora_inicio) {
      setMensaje("Por favor llena los campos obligatorios.");
      return;
    }

    try {
      // Enviar solicitud POST para realizar el préstamo
      const res = await fetch("http://localhost:8000/realizar_prestamo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.mensaje) {
        // Mostrar mensaje de éxito
        setMensaje(data.mensaje);
        // Limpiar formulario
        setFormData({
          numero_empleado: "",
          numero_serie: "",
          hora_inicio: "",
          hora_fin: "",
          motivo: "",
        });

        // Refrescar la lista de dispositivos
        await obtenerDispositivos();
      } else {
        // Mostrar error recibido del backend o un error genérico
        setMensaje(data.error || "Error desconocido.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  // Función para obtener los dispositivos disponibles y prestados del backend
  const obtenerDispositivos = async () => {
    try {
      // Obtener dispositivos disponibles
      const resDisponibles = await fetch(
        "http://localhost:8000/dispositivos/disponibles"
      );
      const disponibles = await resDisponibles.json();
      setDispositivosDisponibles(disponibles);

      // Obtener dispositivos prestados
      const resPrestados = await fetch(
        "http://localhost:8000/dispositivos_no_disponibles/"
      );
      const prestados = await resPrestados.json();
      // console.log("Prestados recibidos:", prestados);
      setDispositivosPrestados(prestados);
    } catch (error) {
      console.error("Error obteniendo dispositivos:", error);
    }
  };

  // console.log("Dispositivos prestados a renderizar:", dispositivosPrestados);

  // Función para manejar la entrega (devolución) de un dispositivo
  const manejarEntrega = async (numero_serie) => {
    try {
      // Enviar solicitud PUT para actualizar el estado del dispositivo como entregado
      const respuesta = await fetch(
        `http://localhost:8000/entregar_dispositivo/${numero_serie}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (respuesta.ok) {
        // Refrescar la lista de dispositivos después de la entrega
        await obtenerDispositivos();
      } else {
        console.error("Error al entregar dispositivo");
      }
    } catch (error) {
      console.error("Error en la entrega:", error);
    }
  };

  return (
    <div>
      {/* Menú toggle */}
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
            <h3 className="mb-3">Realizar préstamo</h3>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Número de empleado"
                name="numero_empleado"
                value={formData.numero_empleado}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Número de serie"
                name="numero_serie"
                value={formData.numero_serie}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hora inicio</label>
              <input
                type="time"
                className="form-control bg-warning" 
                name="hora_inicio"
                value={formData.hora_inicio}
                onChange={handleChange}
                step="900" // 900 segundos = 15 minutos
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hora fin</label>
              <input
                type="time"
                className="form-control bg-warning"
                name="hora_fin"
                value={formData.hora_fin}
                onChange={handleChange}
                step="900"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Prestar
            </button>

            {mensaje && <p className="mensaje-feedback mt-2">{mensaje}</p>}
          </form>
        </div>

        <section className="tablas-dispositivos">
          <div className="container mt-4">
            <div className="row">
              {/* Tabla de dispositivos prestados */}
              <div className="col-md-6">
                <h3>Dispositivos Prestados</h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Dispositivo</th>
                        <th>No. de serie</th>
                        <th>Tipo</th>
                        <th>Marca</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispositivosPrestados.length === 0 ? (
                        <tr>
                          <td colSpan="6">No hay dispositivos prestados</td>
                        </tr>
                      ) : (
                        dispositivosPrestados.map((dispositivo, index) => (
                          <tr key={index}>
                            <td>{dispositivo.numero_dispositivo}</td>
                            <td>{dispositivo.numero_serie}</td>
                            <td>{dispositivo.tipo}</td>
                            <td>{dispositivo.marca}</td>
                            <td>{dispositivo.estado}</td>
                            <td>
                              {dispositivo.estado === "Vigente" ||
                                dispositivo.estado === "Atrasado" ? (
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    manejarEntrega(dispositivo.numero_serie)
                                  }
                                >
                                  Entregar
                                </button>
                              ) : (
                                <span className="text-muted">
                                  {dispositivo.estado}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabla de dispositivos disponibles */}
              <div className="col-md-6">
                <h3>Dispositivos Disponibles</h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Dispositivo</th>
                        <th>No. de serie</th>
                        <th>Tipo</th>
                        <th>Marca</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispositivosDisponibles.length === 0 ? (
                        <tr>
                          <td colSpan="4">No hay dispositivos disponibles</td>
                        </tr>
                      ) : (
                        dispositivosDisponibles.map((dispositivo, index) => (
                          <tr key={index}>
                            <td>{dispositivo.tipo}</td>
                            <td>{dispositivo.numero_serie}</td>
                            <td>{dispositivo.tipo}</td>
                            <td>{dispositivo.marca}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mensaje */}
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
          </div>
        </section>
      </main>
    </div>
  );
};
export default PrestamosMain;
