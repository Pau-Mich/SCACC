import React, { useState } from "react";

export default function InvitadoForm({ formInv, handleInvChange, submitInv }) {
  const [errors, setErrors] = useState({});

// ...existing code...
  const validateInv = () => {
    const errs = {};
    const nombre = (formInv.nombre || "").trim();
    const apellido_paterno = (formInv.apellido_paterno || "").trim();
    const apellido_materno = (formInv.apellido_materno || "").trim();
    const telefono = (formInv.telefono || "").trim();
    const correo = (formInv.correo || "").trim();
    const motivo_visita = (formInv.motivo_visita || "").trim();

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre)) {
      errs.nombre = "El nombre solo debe contener letras y espacios.";
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(apellido_paterno)) {
      errs.apellido_paterno = "El apellido paterno solo debe contener letras.";
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(apellido_materno)) {
      errs.apellido_materno = "El apellido materno solo debe contener letras.";
    }

    if (!/^\d{10}$/.test(telefono)) {
      errs.telefono = "El teléfono debe contener exactamente 10 dígitos.";
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
      errs.correo = "El correo no tiene un formato válido.";
    }

    if (!motivo_visita) {
      errs.motivo_visita = "El motivo de la visita es obligatorio.";
    }

    return errs;
  };

  const handleSubmitInternal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errs = validateInv();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      submitInv && submitInv(e);
    }
  };
// ...existing code...

  return (
    <form onSubmit={handleSubmitInternal} className="needs-validation" noValidate>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            value={formInv.nombre}
            onChange={handleInvChange}
            className="form-control"
          />
          {errors.nombre && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.nombre}</p>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Apellido paterno</label>
          <input
            name="apellido_paterno"
            value={formInv.apellido_paterno}
            onChange={handleInvChange}
            className="form-control"
          />
          {errors.apellido_paterno && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.apellido_paterno}</p>}
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
          {errors.apellido_materno && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.apellido_materno}</p>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input
            name="telefono"
            maxLength={10}
            value={formInv.telefono}
            onChange={handleInvChange}
            className="form-control"
          />
          {errors.telefono && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.telefono}</p>}
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
        {errors.correo && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.correo}</p>}
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
          {errors.hora_entrada && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.hora_entrada}</p>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Razón de visita</label>
          <input
            name="motivo_visita"
            value={formInv.motivo_visita}
            onChange={handleInvChange}
            className="form-control"
          />
          {errors.motivo_visita && <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.motivo_visita}</p>}
        </div>
      </div>

      <button type="submit" className="btn bg-danger text-white">
        Registrar Invitado
      </button>
    </form>
  );
}