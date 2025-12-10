import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style-Gestion.css";
import Menu from "./menu";
import UserMenu from "../pages/user_componentes/user_menu";
import InvitadoForm from "../pages/user_componentes/invitado_form";
import UsuarioForm from "../pages/user_componentes/usuario_form";
import UsuariosRegistrados from "../pages/user_componentes/usuarios_registrados";

export default function UserManagement() {
  const [page, setPage] = useState("administrativo");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [fingerprint, setFingerprint] = useState("");

  const [huellaCapturada, setHuellaCapturada] = useState(false);
  const [cambioContrasenia, setCambioContrasenia] = useState(false);

  const [errorsInv, setErrorsInv] = useState({});
  const [errorsUsr, setErrorsUsr] = useState({});

  const [formErrorInv, setFormErrorInv] = useState("");
  const [formErrorUsr, setFormErrorUsr] = useState("");

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
    // contrasenia: "",
  };
  const [formUsr, setFormUsr] = useState({ ...initialUsr });
  const [searchId, setSearchId] = useState("");
  const [usrData, setUsrData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // -------- VALIDACIONES ----------
  const validateUsr = () => {
    const errs = {};

    if (!/^\d{1,8}$/.test(formUsr.id_usuario)) {
      errs.id_usuario =
        "El número de empleado/matrícula debe ser solo dígitos y máximo 8.";
    }
    if (!formUsr.nombre.trim()) {
      errs.nombre = "El nombre es obligatorio.";
    }
    if (!formUsr.apellido_paterno.trim()) {
      errs.apellido_paterno = "El apellido paterno es obligatorio.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formUsr.correo)) {
      errs.correo = "El correo no es válido.";
    }
    if (!/^\d{10}$/.test(formUsr.telefono)) {
      errs.telefono = "El teléfono debe tener 10 dígitos.";
    }
    // if (!formUsr.contrasenia.trim()) {
    //   errs.contrasenia = "La contraseña es obligatoria.";
    // }

    return errs;
  };

  const validateInv = () => {
    const errs = {};

    if (!formInv.nombre.trim()) {
      errs.nombre = "El nombre es obligatorio.";
    }
    if (!formInv.apellido_paterno.trim()) {
      errs.apellido_paterno = "El apellido paterno es obligatorio.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInv.correo)) {
      errs.correo = "El correo no es válido.";
    }
    if (!/^\d{10}$/.test(formInv.telefono)) {
      errs.telefono = "El teléfono debe tener 10 dígitos.";
    }
    if (!formInv.motivo_visita.trim()) {
      errs.motivo_visita = "El motivo de la visita es obligatorio.";
    }

    return errs;
  };

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

  // -------- HANDLERS ----------
  const handleInvChange = (e) => {
    setFormInv((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrorsInv((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleUsrChange = (e) => {
    setFormUsr((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrorsUsr((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const captureFingerprint = () => {
    setFingerprint(btoa(Date.now().toString()));
    setHuellaCapturada(true);
  };

  const submitInv = async (e) => {
    e.preventDefault();
    const errs = validateInv();
    if (Object.keys(errs).length > 0) {
      setErrorsInv(errs);
      setFormErrorInv("No es posible hacer el registro, corrige los campos.");
      return;
    }
    setFormErrorInv("");

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
      setErrorsInv({});
    } catch (err) {
      console.error(err);
      alert("Error al registrar invitado");
    }
  };

  const submitUsr = async (e) => {
    e.preventDefault();
    if (!huellaCapturada) return alert("Debes capturar la huella primero");

    const errs = validateUsr();
    if (Object.keys(errs).length > 0) {
      setErrorsUsr(errs);
      setFormErrorUsr("No es posible hacer el registro, corrige los campos.");
      return;
    }
    setFormErrorUsr("");

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
      // contrasenia: formUsr.contrasenia,
      fingerprint,
      // puedes añadir estado u otros campos por defecto aquí
    };

    // Sólo agregamos semestre si es estudiante
    if (page === "estudiante") {
      const sem = parseInt(formUsr.semestre, 10);
      if (isNaN(sem)) {
        // Actualizamos errorsUsr agregando un error para el campo semestre
        return setErrorsUsr((prev) => ({
          ...prev, // copiamos los errores anteriores
          semestre: "El semestre debe ser un número válido.", // añadimos este nuevo
        }));
      }
      payload.semestre = sem; // si es válido, lo mandamos en el payload
    }

    try {
      await axios.post("http://localhost:8000/usuarios/registrar/", payload);
      alert(`Usuario ${page} registrado`);
      // Reset del formulario
      setFormUsr({ ...initialUsr, rol: page });
      setHuellaCapturada(false);
      setFingerprint("");
      setErrorsUsr({});
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
    // // Si cambió contraseña, exige huella
    // if (cambioContrasenia && !huellaCapturada) {
    //   return alert("Debes capturar la huella para cambiar la contraseña");
    // }
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
      <Menu />
      <div className="main-content">
        <div className="titulo">
          <h3>Gestión de Usuarios</h3>
        </div>

        <UserMenu
          page={page}
          setPage={setPage}
          submenuOpen={submenuOpen}
          setSubmenuOpen={setSubmenuOpen}
        />

        <main className="contenedor-formularios">
          {page === "invitado" && (
            <InvitadoForm
              formInv={formInv}
              handleInvChange={handleInvChange}
              submitInv={submitInv}
              errors={errorsInv}
              formErrorInv={formErrorInv}
            />
          )}

          {(page === "administrativo" ||
            page === "personal" ||
            page === "estudiante") && (
            <UsuarioForm
              page={page}
              formUsr={formUsr}
              handleUsrChange={handleUsrChange}
              submitUsr={submitUsr}
              captureFingerprint={captureFingerprint}
              huellaCapturada={huellaCapturada}
            />
          )}

          {page === "registrados" && (
            <UsuariosRegistrados
              searchId={searchId}
              setSearchId={setSearchId}
              buscarUsr={buscarUsr}
              usrData={usrData}
              setUsrData={setUsrData}
              guardarUsr={guardarUsr}
              eliminarUsr={eliminarUsr}
              editMode={editMode}
              setEditMode={setEditMode}
              cambioContrasenia={cambioContrasenia}
              captureFingerprint={captureFingerprint}
              huellaCapturada={huellaCapturada}
            />
          )}
        </main>
      </div>
    </div>
  );
}
