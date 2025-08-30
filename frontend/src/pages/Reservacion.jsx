import React, { useEffect, useState } from "react";
import "../styles/Reservacion.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Menu from "../pages/menu";
import axios from "axios";
import TablaReservaciones from "./reservaciones_componentes/TablaReservaciones";
import FormularioReservacion from "./reservaciones_componentes/FormularioReservacion";

const initialFormData = {
  id_usuario: "",
  id_horario: "",
  fecha_inicio: "",
  fecha_fin: "",
  sala: "A",
  modalidad: "Semestral",
  materia: "",
  semestre: "",
  grupo: "",
  estado: "Activa",
};

const getMonday = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const Reservaciones = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [horarios, setHorarios] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(getMonday);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);

  // Solo una declaración de currentWeekEnd
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 4);

  // Solo un useEffect para cargar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [horariosRes, reservacionesRes] = await Promise.all([
          axios.get("http://localhost:8000/reservaciones/horarios/"),
          axios.get("http://localhost:8000/reservaciones/"),
        ]);
        setHorarios(horariosRes.data);
        setReservaciones(reservacionesRes.data);
      } catch (err) {
        setError(
          "Error al cargar datos: " + (err.response?.data?.error || err.message)
        );
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Solo una función changeWeek
  const changeWeek = (direction) => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      return newDate;
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //Validaciones
      if (!/^\d+$/.test(formData.id_usuario)) {
        throw new Error("El número de empleado solo puede contener números");
      }

      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.materia)) {
        throw new Error("La materia solo puede contener letras");
      }

      if (!/^\d+$/.test(formData.semestre)) {
        throw new Error("El semestre solo puede contener números");
      }

      if (!/^[A-Za-z]$/.test(formData.grupo)) {
        throw new Error("El grupo debe ser una sola letra");
      }

      if (formData.modalidad === "Semestral" && !formData.dia_semana) {
        throw new Error(
          "Debes seleccionar un día de la semana para reservas semestrales"
        );
      }

      if (formData.fecha_inicio && formData.fecha_fin) {
        const inicio = new Date(formData.fecha_inicio);
        const fin = new Date(formData.fecha_fin);
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
          throw new Error("Una o ambas fechas no son válidas.");
        }
        if (inicio > fin) {
          throw new Error(
            "La fecha de inicio no puede ser posterior a la de fin."
          );
        }
      }

      const datosEnvio = {
        ...formData,
        dia_semana:
          formData.modalidad === "Semestral" ? formData.dia_semana : null,
      };

      const resumen = `
📌 Empleado: ${formData.id_usuario}
📚 Materia: ${formData.materia}
🗓️ Inicio: ${formData.fecha_inicio}
🗓️ Fin: ${formData.fecha_fin}
🏫 Sala: ${formData.sala}
🕒 Horario: ${formData.id_horario}
📖 Modalidad: ${formData.modalidad}
${formData.modalidad === "Semestral" ? `📅 Día: ${formData.dia_semana}` : ""}
🎓 Semestre: ${formData.semestre}
👥 Grupo: ${formData.grupo}
¿Deseas confirmar esta reservación?
    `;

      if (!window.confirm(resumen)) {
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/reservaciones/crear/",
        datosEnvio
      );

      setReservaciones((prev) => [...prev, res.data]);
      setFormData(initialFormData);
      alert("✅ Reservación creada exitosamente!");
    } catch (err) {
      setError(
        "❌ Error al crear reservación: " +
          (err.response?.data?.error || err.message)
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu />
      <div className="main-content">
        <h1>Reservaciones</h1>

        <FormularioReservacion
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          horarios={horarios}
          loading={loading}
          error={error}
          diasSeleccionados={diasSeleccionados}
          setDiasSeleccionados={setDiasSeleccionados}
        />
        <br />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-primary"
            onClick={() => changeWeek("prev")}
          >
            Semana Anterior
          </button>
          <h4>
            Semana del {currentWeekStart.toLocaleDateString()} al{" "}
            {new Date(
              currentWeekStart.getFullYear(),
              currentWeekStart.getMonth(),
              currentWeekStart.getDate() + 4
            ).toLocaleDateString()}
          </h4>
          <button
            className="btn btn-primary"
            onClick={() => changeWeek("next")}
          >
            Semana Siguiente
          </button>
        </div>

        <TablaReservaciones
          currentWeekStart={currentWeekStart}
          reservaciones={reservaciones}
        />
      </div>
    </>
  );
};

export default Reservaciones;
// ...fin del archivo...
