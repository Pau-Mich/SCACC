import React from "react";

export default function InvitadoForm({ formInv, handleInvChange, submitInv }) {
  return (
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
  );
}
