import React, { useEffect, useState } from 'react';
import '../styles/Reservacion.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Menu from '../pages/menu';
import axios from 'axios';

const Reservaciones = () => {

  const [formData, setFormData] = useState({
    id_usuario: '',
    id_horario: '',
    fecha_inicio: '',
    fecha_fin: '',
    sala: 'A',
    modalidad: 'Semestral',
    materia: '',
    semestre: '',
    grupo: '',
    estado: 'Activa',
  });

  const [horarios, setHorarios] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 5); // Solo hasta sábado

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const res = await axios.get('http://localhost:8000/reservaciones/horarios/');
        setHorarios(res.data);
      } catch (err) {
        console.error('Error al cargar horarios:', err);
      }
    };
    fetchHorarios();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/reservaciones/');
        setReservaciones(res.data);
      } catch (err) {
        setError('Error al cargar datos: ' + (err.response?.data?.error || err.message));
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const changeWeek = (direction) => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.id_usuario.trim()) throw new Error('El número de empleado es requerido');

      if (formData.fecha_inicio && formData.fecha_fin) {
        const inicio = new Date(formData.fecha_inicio);
        const fin = new Date(formData.fecha_fin);
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
          throw new Error('Una o ambas fechas no son válidas.');
        }
        if (inicio > fin) throw new Error('La fecha de inicio no puede ser posterior a la de fin.');
      }

      const resumen = `
📌 Empleado: ${formData.id_usuario}
📚 Materia: ${formData.materia}
🗓️ Inicio: ${formData.fecha_inicio}
🗓️ Fin: ${formData.fecha_fin}
🏫 Sala: ${formData.sala === '1' ? 'A' : formData.sala === '2' ? 'B' : 'C'}
🕒 Horario: ${formData.id_horario}
📖 Modalidad: ${formData.modalidad}
🎓 Semestre: ${formData.semestre}
👥 Grupo: ${formData.grupo}
¿Deseas confirmar esta reservación?
      `;
      const confirmar = window.confirm(resumen);
      if (!confirmar) {
        setLoading(false);
        return;
      }

      const res = await axios.post('http://localhost:8000/reservaciones/crear/', formData);
      setReservaciones(prev => [...prev, res.data]);

      setFormData({
        id_usuario: '',
        id_horario: '',
        fecha_inicio: '',
        fecha_fin: '',
        sala: 'A',
        modalidad: 'Semestral',
        materia: '',
        semestre: '',
        grupo: '',
        estado: 'Activa',
      });

      alert('✅ Reservación creada exitosamente!');
    } catch (err) {
      setError('❌ Error al crear reservación: ' + (err.response?.data?.error || err.message));
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Menú toggle */}
     < Menu />
      {/* Contenido principal */}
      <div className="main-content">
        <h1>Reservaciones</h1>

        {/* Formulario de nueva reservación */}
        <div className="horario p-4 bg-light rounded shadow">
          <h2 className="text-center mb-4">Nueva Reservación</h2>

          {/* Mostrar errores si existen */}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="id_usuario" className="form-label fw-bold">No. Empleado</label>
                <input
                  type="text"
                  name="id_usuario"
                  id="id_usuario"
                  className="form-control form-control-sm"
                  required
                  value={formData.id_usuario}
                  onChange={handleChange}
                  placeholder="Ingrese su número de empleado"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="materia" className="form-label fw-bold">Materia</label>
                <input
                  type="text"
                  name="materia"
                  id="materia"
                  className="form-control form-control-sm"
                  required
                  value={formData.materia}
                  onChange={handleChange}
                  placeholder="Nombre de la materia"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fecha_inicio" className="form-label fw-bold">Fecha de inicio</label>
                <input
                  type="date"
                  name="fecha_inicio"
                  id="fecha_inicio"
                  className="form-control form-control-sm"
                  required
                  value={formData.fecha_inicio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="fecha_fin" className="form-label fw-bold">Fecha final</label>
                <input
                  type="date"
                  name="fecha_fin"
                  id="fecha_fin"
                  className="form-control form-control-sm"
                  required
                  value={formData.fecha_fin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="sala" className="form-label fw-bold">Sala</label>
                <select
                  name="sala"
                  id="sala"
                  className="form-select form-select-sm"
                  value={formData.sala}
                  required
                  onChange={handleChange}
                >
                  <option value="A">Sala A</option>
                  <option value="B">Sala B</option>
                  <option value="C">Sala C</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="modalidad" className="form-label fw-bold">Modalidad</label>
                <select
                  name="modalidad"
                  id="modalidad"
                  className="form-select form-select-sm"
                  value={formData.modalidad}
                  required
                  onChange={handleChange}
                >
                  <option value="Semestral">Semestral</option>
                  <option value="Unica vez">Única vez</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="id_horario" className="form-label fw-bold">Horario</label>
              <select
                name="id_horario"
                id="id_horario"
                className="form-select form-select-sm"
                value={formData.id_horario}
                required
                onChange={handleChange}
              >
                <option value="">Seleccione un horario</option>
                {horarios.map((horario) => (
                  <option key={horario.id_horario} value={horario.id_horario}>
                    {horario.hora_inicio} - {horario.hora_fin}
                  </option>
                ))}
              </select>
            </div>


            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="semestre" className="form-label fw-bold">Semestre</label>
                <input
                  type="text"
                  name="semestre"
                  id="semestre"
                  className="form-control form-control-sm"
                  required
                  value={formData.semestre}
                  onChange={handleChange}
                  placeholder="Ej. 6"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="grupo" className="form-label fw-bold">Grupo</label>
                <input
                  type="text"
                  name="grupo"
                  id="grupo"
                  className="form-control form-control-sm"
                  required
                  value={formData.grupo}
                  onChange={handleChange}
                  placeholder="Ej. A"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-sm"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Reservar'}
            </button>
          </form>
        </div>

        <br />

        {/* Controles de semana para el calendario */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-secondary" onClick={() => changeWeek('prev')}>
            <i className="fas fa-chevron-left"></i> Semana anterior
          </button>

          <h2 className="mx-3">
            {currentWeekStart.toISOString().slice(0, 10)} a {currentWeekEnd.toISOString().slice(0, 10)}
          </h2>

          <button className="btn btn-secondary" onClick={() => changeWeek('next')}>
            Semana siguiente <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Tabla de horario semanal */}
        <h2 className="mt-5">Horario semanal de reservaciones</h2>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table className="table table-bordered text-center mt-3">
            <thead className="table-dark">
              <tr>
                <th>Horario</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
              </tr>
            </thead>
            <tbody>
              {[
                '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
              ].map(hora_inicio => (
                <tr key={hora_inicio}>
                  <td>{hora_inicio} - {parseInt(hora_inicio) + 1}:00</td>
                  {[1, 2, 3, 4, 5, 6].map(dia => {
                    const fechaActual = new Date(currentWeekStart);
                    fechaActual.setDate(currentWeekStart.getDate() + (dia - 2));
                    fechaActual.setHours(0, 0, 0, 0);

                    return (
                      <td key={dia}>
                        {reservaciones
                          .filter(r => {
                            const fechaInicio = new Date(r.fecha_inicio);
                            fechaInicio.setHours(0, 0, 0, 0);
                            const fechaFin = new Date(r.fecha_fin);
                            fechaFin.setHours(0, 0, 0, 0);
                            return fechaActual >= fechaInicio && fechaActual <= fechaFin &&
                              r.horario?.hora_inicio === hora_inicio;
                          })
                          .map((r, idx) => (
                            <div key={idx} className="text-nowrap small">
                              <strong>{r.usuario?.nombre} {r.usuario?.apellido_paterno}</strong><br />
                              <span className="fw-bold">Sala: {r.sala}</span>
                            </div>
                          ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reservaciones;