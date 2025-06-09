import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style-Gestion.css";
import Menu from "./menu"


export default function UserManagement() {

  const [page, setPage] = useState("administrativo");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [fingerprint, setFingerprint] = useState("");

  const [huellaCapturada, setHuellaCapturada] = useState(false);
  const [cambioContrasenia, setCambioContrasenia] = useState(false);

  const [formInv, setFormInv] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    telefono: "",
    hora_entrada: "",
    motivo_visita: "",
  });

  const initialUsr = {
    id_usuario: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    rol: "administrativo",
    programa_educativo_area: "",
    semestre: "",
    correo: "",
    telefono: "",
    contrasenia: "",
  };
  const [formUsr, setFormUsr] = useState({ ...initialUsr });
  const [searchId, setSearchId] = useState("");
  const [usrData, setUsrData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (["administrativo", "personal", "estudiante"].includes(page)) {
      setFormUsr({ ...initialUsr, rol: page });
      setHuellaCapturada(false);
      setFingerprint("");
    }
    if (page === "invitado") {
      setFormInv({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        telefono: "",
        hora_entrada: "",
        motivo_visita: "",
      });
    }
    if (page === "registrados") {
      setUsrData(null);
      setSearchId("");
      setEditMode(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleInvChange = (e) =>
    setFormInv((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleUsrChange = (e) =>
    setFormUsr((f) => ({ ...f, [e.target.name]: e.target.value }));

  const captureFingerprint = () => {
    setFingerprint(btoa(Date.now().toString()));
    setHuellaCapturada(true);
  };

  const submitInv = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/invitados/registrar/", formInv);
      alert("Invitado registrado");
      setFormInv({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        telefono: "",
        hora_entrada: "",
        motivo_visita: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al registrar invitado");
    }
  };

  const submitUsr = async (e) => {
    e.preventDefault();
    if (!huellaCapturada) return alert("Debes capturar la huella primero");

    // Construyendo el payload base
    const payload = {
      id_usuario: formUsr.id_usuario,
      nombre: formUsr.nombre,
      apellido_paterno: formUsr.apellido_paterno,
      apellido_materno: formUsr.apellido_materno,
      rol: formUsr.rol,
      programa_educativo_area: formUsr.programa_educativo_area,
      correo: formUsr.correo,
      telefono: formUsr.telefono,
      contrasenia: formUsr.contrasenia,
      fingerprint,
      // puedes añadir estado u otros campos por defecto aquí
    };

    // Sólo agregamos semestre si es estudiante
    if (page === "estudiante") {
      const sem = parseInt(formUsr.semestre, 10);
      if (isNaN(sem)) {
        return alert("El semestre debe ser un número válido");
      }
      payload.semestre = sem;
    }

    try {
      await axios.post("http://localhost:8000/usuarios/registrar/", payload);
      alert(`Usuario ${page} registrado`);
      // Reset del formulario
      setFormUsr({ ...initialUsr, rol: page });
      setHuellaCapturada(false);
      setFingerprint("");
    } catch (err) {
      // Logueamos detalles en consola
      console.error("Error al registrar usuario:");
      console.error("Status:", err.response?.status);
      console.error("Response data:", err.response?.data);

      // Mostramos al usuario el mensaje de error detallado
      const detalle = err.response?.data?.error || err.message;
      alert("Error en servidor: " + detalle);
    }
  };

  const buscarUsr = async () => {
    if (!searchId) return alert("Ingresa ID o Matrícula");
    try {
      const res = await axios.get(
        `http://localhost:8000/usuarios/${searchId}/`
      );
      setUsrData(res.data);
      setEditMode(false);
    } catch {
      alert("Usuario no encontrado");
    }
  };

  const guardarUsr = async () => {
    // Si cambió contraseña, exige huella
    if (cambioContrasenia && !huellaCapturada) {
      return alert("Debes capturar la huella para cambiar la contraseña");
    }
    // Armamos payload según rol y campos permitidos
    const payload = {
      correo: usrData.correo,
      telefono: usrData.telefono,
    };
    if (usrData.rol === "personal" || usrData.rol === "estudiante") {
      payload.programa_educativo_area = usrData.programa_educativo_area;
    }
    if (usrData.rol === "estudiante") {
      payload.semestre = parseInt(usrData.semestre, 10);
    }
    if (cambioContrasenia) {
      payload.contrasenia = usrData.contrasenia;
      payload.fingerprint = fingerprint;
    }
    try {
      await axios.put(
        `http://localhost:8000/usuarios/${usrData.id_usuario}/`,
        payload
      );
      alert("Usuario actualizado");
      setEditMode(false);
      setCambioContrasenia(false);
      setHuellaCapturada(false);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(
        "Error al actualizar: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const eliminarUsr = async () => {
    if (!window.confirm("Eliminar usuario?")) return;
    try {
      await axios.delete(
        `http://localhost:8000/usuarios/${usrData.id_usuario}/eliminar/`
      );
      alert("Usuario eliminado");
      setUsrData(null);
      setSearchId("");
    } catch {
      alert("Error al eliminar");
    }
  };

  return (
    <div>
      {/* Menú toggle */}
      <Menu />
      <div className="main-content">
        <div className="titulo">
          <h3>Gestión de Usuarios</h3>
        </div>
        <nav className="menu-principal">
          <ul>
            <li className="submenu-contenedor">
              <span
                className="btn-submenu"
                onClick={() => setSubmenuOpen((o) => !o)}
              >
                Nuevo Usuario
              </span>
              <ul className={`submenu ${submenuOpen ? "activo" : ""}`}>
                <li
                  onClick={() => {
                    setPage("administrativo");
                    setSubmenuOpen(false);
                  }}
                >
                  Administrativo
                </li>
                <li
                  onClick={() => {
                    setPage("personal");
                    setSubmenuOpen(false);
                  }}
                >
                  Personal
                </li>
                <li
                  onClick={() => {
                    setPage("estudiante");
                    setSubmenuOpen(false);
                  }}
                >
                  Estudiante
                </li>
              </ul>
            </li>
            <li onClick={() => setPage("registrados")}>Usuarios registrados</li>
            <li onClick={() => setPage("invitado")}>Invitado</li>
          </ul>
        </nav>

        <main className="contenedor-formularios">
          {page === "invitado" && (
            <form onSubmit={submitInv} className="needs-validation" noValidate>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    name="nombre"
                    value={formInv.nombre}
                    onChange={handleInvChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellido paterno</label>
                  <input
                    name="apellido_paterno"
                    value={formInv.apellido_paterno}
                    onChange={handleInvChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Apellido materno</label>
                  <input
                    name="apellido_materno"
                    value={formInv.apellido_materno}
                    onChange={handleInvChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Teléfono</label>
                  <input
                    name="telefono"
                    value={formInv.telefono}
                    onChange={handleInvChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={formInv.correo}
                  onChange={handleInvChange}
                  className="form-control"
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Hora de entrada</label>
                  <input
                    type="time"
                    name="hora_entrada"
                    value={formInv.hora_entrada}
                    onChange={handleInvChange}
                    className="form-control bg-warning"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Razón de visita</label>
                  <input
                    name="motivo_visita"
                    value={formInv.motivo_visita}
                    onChange={handleInvChange}
                    className="form-control"
                  />
                </div>
              </div>
              <button type="submit" className="btn bg-danger text-white">
                Registrar Invitado
              </button>
            </form>
          )}

          {(page === "administrativo" ||
            page === "personal" ||
            page === "estudiante") && (
              <form onSubmit={submitUsr} className="needs-validation" noValidate>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {page === "estudiante" ? "Matrícula" : "Número de empleado"}
                    </label>
                    <input
                      name="id_usuario"
                      value={formUsr.id_usuario}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                      name="nombre"
                      value={formUsr.nombre}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Apellido paterno</label>
                    <input
                      name="apellido_paterno"
                      value={formUsr.apellido_paterno}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido materno</label>
                    <input
                      name="apellido_materno"
                      value={formUsr.apellido_materno}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                </div>
                {(page === "personal" || page === "estudiante") && (
                  <div className="mb-3">
                    <label className="form-label">Programa Educativo / Area </label>
                    <input
                      name="programa_educativo_area"
                      value={formUsr.programa_educativo_area}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                )}
                {page === "estudiante" && (
                  <div className="mb-3">
                    <label className="form-label">Semestre</label>
                    <input
                      type="number"
                      name="semestre"
                      value={formUsr.semestre}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                )}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      name="correo"
                      value={formUsr.correo}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                      name="telefono"
                      value={formUsr.telefono}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                </div>
                {page === "administrativo" && (
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      name="contrasenia"
                      value={formUsr.contrasenia}
                      onChange={handleUsrChange}
                      className="form-control"
                    />
                  </div>
                )}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn bg-warning text-white"
                    onClick={captureFingerprint}
                  >
                    Capturar Huella
                  </button>
                  {huellaCapturada && (
                    <span className="ms-3 text-success">Huella capturada</span>
                  )}
                </div>
                <button type="submit" className="btn bg-danger text-white">
                  Registrar {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              </form>
            )}

          {page === "registrados" && (
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="ID o Matrícula"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                onClick={buscarUsr}
                className="btn btn-outline-secondary mt-2"
              >
                Buscar
              </button>
              {usrData && (
                <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                  {/* Nombre y Apellidos */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre</label>
                      <input
                        className="form-control"
                        value={usrData.nombre}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Apellidos</label>
                      <input
                        className="form-control"
                        value={`${usrData.apellido_paterno} ${usrData.apellido_materno}`}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Programa Educativo (profesor & estudiante) */}
                  {(usrData.rol === "personal" ||
                    usrData.rol === "estudiante") && (
                      <div className="mb-3">
                        <label className="form-label">
                          Programa Educativo / Area
                        </label>
                        <input
                          className="form-control"
                          value={usrData.programa_educativo_area || ""}
                          disabled={!editMode}
                          onChange={(e) =>
                            setUsrData({
                              ...usrData,
                              programa_educativo_area: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                  {/* Semestre (solo estudiante) */}
                  {usrData.rol === "estudiante" && (
                    <div className="mb-3">
                      <label className="form-label">Semestre</label>
                      <input
                        type="number"
                        className="form-control"
                        value={usrData.semestre || ""}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUsrData({ ...usrData, semestre: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {/* Correo y Teléfono */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        value={usrData.correo}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUsrData({ ...usrData, correo: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Teléfono</label>
                      <input
                        className="form-control"
                        value={usrData.telefono}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUsrData({ ...usrData, telefono: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={usrData.contrasenia || ""}
                      disabled={!editMode}
                      onChange={(e) => {
                        setUsrData({ ...usrData, contrasenia: e.target.value });
                        setCambioContrasenia(true);
                      }}
                    />
                  </div>

                  {/* Botones de acción */}
                  <div className="d-flex gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => setEditMode(true)}
                    >
                      Modificar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!editMode}
                      onClick={guardarUsr}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={eliminarUsr}
                    >
                      Eliminar
                    </button>

                    {/* Si cambió la contraseña, pide huella */}
                    {editMode && cambioContrasenia && !huellaCapturada && (
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={captureFingerprint}
                      >
                        Capturar huella para contraseña
                      </button>
                    )}
                    {huellaCapturada && cambioContrasenia && (
                      <span className="text-success ms-2">Huella autorizada</span>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
