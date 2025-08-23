import React, { useState } from "react";

export default function UsuarioForm({
  page,
  formUsr,
  handleUsrChange,
  submitUsr,
  captureFingerprint,
  huellaCapturada,
}) {
  const [errors, setErrors] = useState({});

  // Validación de campos
  const validate = () => {
    let newErrors = {};
        // Validar matrícula o número de empleado
    if (page === "estudiante") {
      if (!/^\d{1,8}$/.test(formUsr.id_usuario.trim())) {
        newErrors.id_usuario =
          "La matrícula debe contener solo números y máximo 8 dígitos.";
      }
    } else {
      if (!/^\d+$/.test(formUsr.id_usuario.trim())) {
        newErrors.id_usuario = "El número de empleado debe contener solo números.";
      }
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formUsr.nombre.trim())) {
      newErrors.nombre = "El nombre solo debe contener letras y espacios.";
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formUsr.apellido_paterno.trim())) {
      newErrors.apellido_paterno = "El apellido paterno solo debe contener letras.";
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formUsr.apellido_materno.trim())) {
      newErrors.apellido_materno = "El apellido materno solo debe contener letras.";
    }

    if (!/^\d{10}$/.test(formUsr.telefono.trim())) {
      newErrors.telefono = "El teléfono debe contener exactamente 10 dígitos.";
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formUsr.correo.trim()
      )
    ) {
      newErrors.correo = "El correo no tiene un formato válido.";
    }

    if (page === "estudiante") {
      const sem = parseInt(formUsr.semestre, 10);
      if (isNaN(sem) || sem <= 0) {
        newErrors.semestre = "El semestre debe ser un número positivo.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      submitUsr(e);
    } else {
      alert("Revisa los errores en el formulario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">
            {page === "estudiante" ? "Matrícula (máx. 8 dígitos)" : "Número de empleado"}
          </label>
          <input
            name="id_usuario"
            value={formUsr.id_usuario}
            maxLength={8}
            required
            onChange={handleUsrChange}
            className={`form-control ${errors.id_usuario ? "is-invalid" : ""}`}
          />
          {errors.id_usuario && (
            <div className="invalid-feedback">{errors.id_usuario}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            required
            value={formUsr.nombre}
            onChange={handleUsrChange}
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Apellido paterno</label>
          <input
            name="apellido_paterno"
            value={formUsr.apellido_paterno}
            onChange={handleUsrChange}
            required
            className={`form-control ${
              errors.apellido_paterno ? "is-invalid" : ""
            }`}
          />
          {errors.apellido_paterno && (
            <div className="invalid-feedback">{errors.apellido_paterno}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Apellido materno</label>
          <input
            name="apellido_materno"
            value={formUsr.apellido_materno}
            onChange={handleUsrChange}
            required
            className={`form-control ${
              errors.apellido_materno ? "is-invalid" : ""
            }`}
          />
          {errors.apellido_materno && (
            <div className="invalid-feedback">{errors.apellido_materno}</div>
          )}
        </div>
      </div>

      {(page === "personal" || page === "estudiante") && (
        <div className="mb-3">
          <label className="form-label">Programa Educativo / Área</label>
          <input
            name="programa_educativo_area"
            required
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
            maxLength={1}
            minValue={1}
            maxValue={9}
            required
            value={formUsr.semestre}
            onChange={handleUsrChange}
            className={`form-control ${errors.semestre ? "is-invalid" : ""}`}
          />
          {errors.semestre && (
            <div className="invalid-feedback">{errors.semestre}</div>
          )}
        </div>
      )}

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Correo</label>
          <input
            type="email"
            name="correo"
            required
            value={formUsr.correo}
            onChange={handleUsrChange}
            className={`form-control ${errors.correo ? "is-invalid" : ""}`}
          />
          {errors.correo && (
            <div className="invalid-feedback">{errors.correo}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input
            name="telefono"
            maxLength={10}
            required
            value={formUsr.telefono}
            onChange={handleUsrChange}
            className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
          />
          {errors.telefono && (
            <div className="invalid-feedback">{errors.telefono}</div>
          )}
        </div>
      </div>

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
  );
}
