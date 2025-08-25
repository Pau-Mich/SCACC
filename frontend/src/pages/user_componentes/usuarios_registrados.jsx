import React from "react";

export default function UsuariosRegistrados({
  searchId,
  setSearchId,
  buscarUsr,
  usrData,
  setUsrData,
  guardarUsr,
  eliminarUsr,
  editMode,
  setEditMode,
  cambioContrasenia,
  captureFingerprint,
  huellaCapturada,
}) {
  return (
    <div className="mb-3">
      <input
        className="form-control"
        placeholder="ID o Matrícula"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={buscarUsr} className="btn btn-outline-secondary mt-2">
        Buscar
      </button>

      {usrData && (
        <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
          {/* Nombre y Apellidos */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={usrData.nombre} disabled />
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

          {/* Programa Educativo */}
          {(usrData.rol === "personal" || usrData.rol === "estudiante") && (
            <div className="mb-3">
              <label className="form-label">Programa Educativo / Área</label>
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

          {/* Semestre */}
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
              }}
            />
          </div>

          {/* Botones */}
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

            {/* Captura de huella si cambió contraseña */}
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
  );
}
