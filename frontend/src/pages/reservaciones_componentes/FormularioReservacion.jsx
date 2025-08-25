import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const FormularioReservacion = ({
  formData,
  handleChange,
  handleSubmit,
  horarios,
  loading,
  error,
}) => {
  const [showModal, setShowModal] = useState(false);

  const inputClass = "form-control form-control-sm";
  const selectClass = "form-select form-select-sm";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // mostrar el modal
  };

  const confirmarReservacion = (e) => {
    setShowModal(false); // cerrar modal
    handleSubmit(); // enviar el formulario
  };

  const cancelarReservacion = () => {
    setShowModal(false); // solo cerrar modal
  };

  return (
    <div className="horario p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Nueva Reservación</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleFormSubmit}>
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

        {/* Nuevo campo para día de la semana (solo visible cuando modalidad es Semestral) */}
        {formData.modalidad === "Semestral" && (
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="dia_semana" className="form-label fw-bold">Día de la semana</label>
              <select
                name="dia_semana"
                id="dia_semana"
                className="form-select form-select-sm"
                value={formData.dia_semana || ''}
                required={formData.modalidad === "Semestral"}
                onChange={handleChange}
              >
                <option value="">Seleccione un día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
              </select>
            </div>
          </div>
        )}

        <div className="col-md-6 mb-3">
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
              uppercase="true"
              maxLength="1"
              value={formData.grupo}
              onChange={handleChange}
              placeholder="Ej. A"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-danger btn-sm" disabled={loading}>
          {loading ? 'Procesando...' : 'Reservar'}
        </button>
      </form>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={cancelarReservacion} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Reservación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segura(o) de que deseas crear esta reservación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarReservacion}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarReservacion}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormularioReservacion;