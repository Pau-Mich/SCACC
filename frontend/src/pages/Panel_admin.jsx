import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../styles/Panel_admin.css';
import persona from "../images/card_human.png";
import axios from "axios";
import "../pages/menu"
import Menu from "./menu"; // Componente del menú lateral
function PanelAdmin() {
    const [prestamos, setPrestamos] = useState([]);
    // Simulando una llamada a API o carga inicial de datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/prestamos/');
                if (res.status === 200) {
                    setPrestamos(res.data);
                }
                console.log("Datos recibidos:", prestamos);
                console.log("Estados de préstamos:", prestamos.map(p => p?.estado));
                console.log("Filtrados activos:", prestamos.filter(p => p && p.estado && p.estado.toLowerCase() !== "devuelto"));

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
        const intervalo = setInterval(() => {
            fetchData(); // <-- Use fetchData instead of obtenerDispositivos
        }, 60000); // cada 60 segundos

        return () => clearInterval(intervalo); // Limpia el intervalo al desmontar
    }, [prestamos]);

    const getStatusClass = (estado) => {
        const lower = estado.toLowerCase();
        if (lower === "vigente") return "status-active";     // Verde
        if (lower === "atrasado" || lower === "retraso") return "status-overdue"; // Rojo
        return ""; // No aplica clase para "devuelto"
    };
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        // Carga los datos reales desde la API
        const fetchSalas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/salas/');
                if (response.status === 200) {
                    setSalas(response.data);
                }
            } catch (error) {
                console.error('Error al obtener salas:', error);
            }
        };

        fetchSalas();
    }, []);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulario, setFormulario] = useState({ nombre: "", correo: "" });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };
    const limpiarFormulario = () => {
        setFormulario({
            matricula: "",
            sala: "",
            uso_maquina: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/crear_acceso/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });

            const contentType = response.headers.get("content-type");

            let data = {};
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            if (response.ok) {
                alert("✅ Acceso registrado correctamente.");
                limpiarFormulario(); // ← Limpiar formulario
                setMostrarFormulario(false); // ← Cerrar modal
            } else if (response.status === 400 && data.error?.includes("Usuario no válido")) {
                alert("⚠️ Usuario no encontrado.");
            } else {
                alert("❌ Error al registrar el acceso: " + (data.error || "Respuesta no válida."));
            }
        } catch (err) {
            alert("❌ Error de red o servidor no disponible.");
            console.error("Error de red:", err);
        }
    };
    return (
        <div>
            {/* Menú toggle */}
            < Menu />
            {/* Contenido principal */}
            <div className="main-content">
                <div className="header-container">
                    <h1>¡Bienvenido a tu plataforma de gestión!</h1>
                    <img src={persona} alt="imagen_decorativa" className="header-image" />
                </div>

                <br />
                <br />
                <br />
                <br />

                <div className="container-fluid px-0">
                    <div className="row g-0">

                        {/* Columna izquierda: botones dentro de card */}
                        <div className="container-fluid px-0">
                            {/* Fila de botones: en una sola fila, sin contenedor adicional */}
                            <div className="row px-3 mb-3">
                                <div className="col-md-6 d-flex flex-column align-items-start">
                                    <h5>¿Hay un invitado?</h5>
                                    <Link to="/gestion_usuarios">
                                        <button className="btn btn-warning">Registrar</button>
                                    </Link>
                                </div>
                                <div className="col-md-6 d-flex flex-column align-items-start">
                                    <h5>Uso de sala por alumno</h5>
                                    <button className="btn btn-warning " onClick={() => setMostrarFormulario(true)}>
                                        Registrar
                                    </button>
                                </div>
                            </div>

                            {/* Tarjetas debajo de los botones */}
                            <div className="row g-0">
                                {/* Salas ocupadas hoy */}
                                <div className="col-md-6 p-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h4 className="card-title text-danger">Salas ocupadas hoy</h4>
                                            <ul className="list-group list-group-flush">
                                                {salas.length > 0 ? (
                                                    salas.map((sala, index) => (
                                                        <li key={index} className="list-group-item">
                                                            <strong>Sala: {sala.sala === '1' ? 'A' : sala.sala === '2' ? 'B' : sala.sala === '3' ? 'C' : 'Desconocida'}</strong><br />
                                                            Unidad de Aprendizaje: <span className="text-danger fw-bold">{sala.materia}</span><br />
                                                            Impartida por: <strong>{sala.usuario.nombre} {sala.usuario.apellido_paterno} {sala.usuario.apellido_materno}</strong>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="list-group-item text-muted">No hay salas ocupadas actualmente</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabla de préstamos */}
                                <div className="col-md-6 p-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h2 className="card-title">Préstamos actuales</h2>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Usuario</th>
                                                            <th>Dispositivo</th>
                                                            <th>Hora de inicio</th>
                                                            <th>Hora de fin</th>
                                                            <th>Estatus</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {prestamos
                                                            .filter(prestamo => prestamo && prestamo.estado && prestamo.estado.toLowerCase() !== "devuelto")
                                                            .map((prestamo, index) => (
                                                                <tr key={index}>
                                                                    <td>{prestamo.usuario}</td>
                                                                    <td>{prestamo.dispositivo}</td>
                                                                    <td>{prestamo.hora_inicio}</td>
                                                                    <td>{prestamo.hora_fin}</td>
                                                                    <td className={getStatusClass(prestamo.estado)}>
                                                                        {prestamo.estado}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        {prestamos.filter(p => p && p.estado && p.estado.toLowerCase() !== "devuelto").length === 0 && (
                                                            <tr>
                                                                <td colSpan="5" className="text-center">No hay préstamos activos</td>
                                                            </tr>
                                                        )}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Modal */}
                    {mostrarFormulario && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Uso de sala por alumno</h5>
                                        <button type="button" className="btn-close" onClick={() => setMostrarFormulario(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-2">
                                                <label>Matricula:</label>
                                                <input
                                                    type="text"
                                                    name="matricula"
                                                    value={formulario.matricula || ""}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label>Sala:</label>
                                                <select
                                                    name="sala"
                                                    className="form-select"
                                                    value={formulario.sala || ""}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Seleccione</option>
                                                    <option value="A">Sala A</option>
                                                    <option value="B">Sala B</option>
                                                    <option value="C">Sala C</option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label>¿Uso de máquina?</label>
                                                <select
                                                    name="uso_maquina"
                                                    className="form-select"
                                                    value={formulario.uso_maquina || ""}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Seleccione</option>
                                                    <option value="Si">Sí</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button type="submit" className="btn btn-success">Escanear huella</button><button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                        limpiarFormulario(); // ← Limpiar formulario
                                                        setMostrarFormulario(false); // ← Cerrar modal
                                                    }}
                                                >
                                                    Cancelar
                                                </button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
export default PanelAdmin;
