import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/prestamos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import officeDesk from "../images/office-desk.png";
import Menu from "./menu";

const EliminarDispositivo = () => {
  const [dispositivo, setDispositivo] = useState(null);
  const [numero_serie, setNumeroSerie] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Función para buscar un dispositivo por número de serie
  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/buscar_dispositivo/${numero_serie}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta del servidor: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.dispositivo) {
          setDispositivo(res.dispositivo);
          setNumeroSerie(res.dispositivo.numero_serie);
          setMensaje("");
        } else {
          setMensaje("Dispositivo no encontrado.");
          setDispositivo(null);
        }
      })
      .catch((error) => {
        setMensaje("Error al conectar con el servidor o dispositivo no encontrado.");
        console.error("Error en handleSearch:", error);
      });
  };
  // Función para eliminar un dispositivo
  const handleDelete = () => {
    if (!dispositivo) {
      alert("No hay dispositivo para eliminar.");
      return;
    }
    fetch(`http://localhost:8000/eliminar_dispositivo/${numero_serie}/`, {
      method: "DELETE",
    })
      .then(response => {
        console.log("Respuesta del servidor:", response);
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
        }
        setMensaje("Dispositivo eliminado exitosamente.");
        setDispositivo(null);
        setNumeroSerie("");
      })
      .catch(error => {
        console.error("Error al eliminar el dispositivo:", error);
        setMensaje("No se pudo eliminar el dispositivo.");
      });
  };
  return (
    <div>
      <Menu />
      <main className="main-content">
        <h1>Préstamos</h1>
        <div className="usuario-header">
          <span>Patricia Trejo Sánchez</span>
        </div>
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
          <form className="formulario-agregar" onSubmit={handleSearch}>
            <h3>Buscar dispositivo</h3>
            <input
              type="search"
              placeholder="Buscar por número de serie"
              name="numero_serie"
              value={numero_serie}
              onChange={(e) => setNumeroSerie(e.target.value)}
              required
            />
            <button type="submit">Buscar</button>
            {dispositivo && (
              <div className="info-dispositivo">
                <p>
                  <strong>Tipo:</strong> {dispositivo.tipo}
                </p>
                <p>
                  <strong>Marca:</strong> {dispositivo.marca}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={handleDelete}
              disabled={!dispositivo}
            >
              Eliminar
            </button>
            {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default EliminarDispositivo;