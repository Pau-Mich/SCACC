// src/components/Reportes.jsx

import React, { useState } from "react";
import "../styles/style-reportes.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

// Importaciones necesarias para generar Excel y PDF
import * as XLSX from "xlsx"; // SheetJS
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Menu from "./menu"
export default function Reportes() {

  // ----------------- 1. Estados principales -----------------
  // 1.1. ¿Qué reporte está seleccionado? ("salas", "estadisticas", "prestamos")
  const [reporte, setReporte] = useState("");

  // 1.2. Filtros de fecha: inicio y fin
  const [filtros, setFiltros] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    id_usuario: "", //SOLO SE USA PARA EL REPORTE DE PRESTAMOS
  });

  // 1.3. Aquí almacenaremos los resultados que nos trae el backend
  //      Para "Uso de salas", será un arreglo de objetos con forma:
  //      { id_acceso, usuario: { matricula, nombre, apellido_paterno, apellido_materno }, fecha, hora, uso_maquina, sala }
  const [resultados, setResultados] = useState(null);

  // 1.4. Estados de carga y de error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ----------------- 2. Botones de selección de reporte -----------------
  const botones = [
    { tipo: "salas", texto: "Uso de salas" },
    { tipo: "estadisticas", texto: "Estadísticas generales" },
    { tipo: "prestamos", texto: "Solicitudes de Préstamos" },
  ];

  // Cuando el usuario hace clic en uno de los botones,
  // actualizamos `reporte` y limpiamos resultados previos.
  const handleReporte = (tipo) => {
    setReporte(tipo);
    setResultados(null);
    setError("");
  };

  // ----------------- 3. Manejador de cambios en los inputs de fecha -----------------
  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------- 4. Función que genera el reporte (en este caso "salas") -----------------
  const generarReporte = async (e) => {
    e.preventDefault();
    setError("");
    setResultados(null);

    // 4.1. Validación: el usuario debe haber escogido un tipo de reporte
    if (!reporte) {
      setError(
        "Debes seleccionar primero qué tipo de reporte quieres generar."
      );
      return;
    }

    // 4.2. Validar que haya ingresado ambas fechas
    if (!filtros.fecha_inicio || !filtros.fecha_fin) {
      setError("Debes ingresar ambas fechas: inicio y fin.");
      return;
    }

    // 4.3. Validar que fecha_inicio <= fecha_fin
    const fechaIni = new Date(filtros.fecha_inicio);
    const fechaFin = new Date(filtros.fecha_fin);
    if (fechaIni > fechaFin) {
      setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }

    setLoading(true);
    try {
      let res = null;

      if (reporte === "salas") {
        // 4.4. Llamada al endpoint de Django que creamos: listar_accesos_diarios
        //      Pasamos fecha_inicio y fecha_fin como params de la query string.
        // justo antes de `let res = await axios.get(…`
        // console.log("→ filtros a enviar:", filtros);

        res = await axios.get("http://localhost:8000/reportes/salas/", {
          params: {
            fecha_inicio: filtros.fecha_inicio,
            fecha_fin: filtros.fecha_fin,
          },
        });
      } else if (reporte === "estadisticas") {
        // Placeholder: más adelante implementaremos esto
        res = await axios.get("http://localhost:8000/reportes/estadisticas/", {
          params: {
            fecha_inicio: filtros.fecha_inicio,
            fecha_fin: filtros.fecha_fin,
          },
        });
      } else if (reporte === "prestamos") {
        // Placeholder: más adelante implementaremos esto
        // console.log("▶️ llamando a:", "http://localhost:8000/reportes/prestamos/", filtros);

        res = await axios.get("http://localhost:8000/reportes/prestamos/", {
          params: {
            fecha_inicio: filtros.fecha_inicio,
            fecha_fin: filtros.fecha_fin,
            id_usuario: filtros.id_usuario,
          },
        });
      } else {
        throw new Error("Tipo de reporte desconocido");
      }

      // 4.5. Si la petición fue exitosa, guardamos la data en `resultados`
      setResultados(res.data);
    } catch (err) {
      // 4.6. Si hay error (server o network), lo capturamos y mostramos
      const mensaje =
        err.response?.data?.error || err.response?.data || err.message;
      setError("Error al generar reporte: " + mensaje);
      console.error("Error en generarReporte():", err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------- 5. Función para descargar la tabla en Excel -----------------
  const descargarExcel = () => {
    if (!resultados || resultados.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // 5.1. Armar un arreglo de filas que coincida con los encabezados deseados.
    //      Cada elemento será un objeto cuyas claves sean los nombres de columna.
    //      Ejemplo:
    //      { Matricula: 123, Nombre: "Juan", Apellidos: "Pérez López", Fecha: "2025-05-02", Hora: "07:15:00", Sala: "A", "Uso de Máquina": "SI" }
    const filasParaExcel = resultados.map((r) => ({
      Matricula: r.usuario.matricula,
      Nombre: r.usuario.nombre,
      Apellidos: `${r.usuario.apellido_paterno} ${r.usuario.apellido_materno}`,
      Fecha: r.fecha,
      Hora: r.hora,
      Sala: r.sala,
      "Uso de Máquina": r.uso_maquina,
    }));

    // 5.2. Convertir ese arreglo de objetos a un worksheet de SheetJS
    const ws = XLSX.utils.json_to_sheet(filasParaExcel);

    // 5.3. Crear un workbook (libro de Excel) y agregarle la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Uso_de_salas");

    // 5.4. Generar el binario del archivo
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    // 5.5. Usar FileSaver para “disparar” la descarga en el navegador
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(
      blob,
      `Reporte_Uso_de_Salas_${filtros.fecha_inicio}_a_${filtros.fecha_fin}.xlsx`
    );
  };

  const DescargarPDF = () => {
    if (!resultados || resultados.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // 1) Creamos el documento PDF
    const doc = new jsPDF("p", "mm", "a4");

    // 2) Escribimos título y rango
    doc.setFontSize(16);
    doc.text("Reporte: Uso de salas", 14, 20);
    doc.setFontSize(11);
    doc.text(`Rango: ${filtros.fecha_inicio} a ${filtros.fecha_fin}`, 14, 28);

    // 3) Preparamos encabezados y filas para autoTable
    const columnas = [
      "Matrícula",
      "Nombre",
      "Apellidos",
      "Fecha",
      "Hora",
      "Sala",
      "Uso de Máquina",
    ];
    const filas = resultados.map((r) => [
      r.usuario.matricula,
      r.usuario.nombre,
      `${r.usuario.apellido_paterno} ${r.usuario.apellido_materno}`,
      r.fecha,
      r.hora,
      r.sala,
      r.uso_maquina,
    ]);

    // 4) Llamamos al plugin autoTable pasándole la instancia ‘doc’
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 35, // deja espacio para el título
      theme: "striped", // estilo de líneas alternas
      styles: { fontSize: 8 }, // fuente más pequeña para que quepa
      headStyles: { fillColor: [41, 128, 185] }, // fondo azul en encabezado
    });

    // 5) Guardamos / descargamos el PDF
    doc.save(
      `Reporte_Uso_de_Salas_${filtros.fecha_inicio}_a_${filtros.fecha_fin}.pdf`
    );
  };
  // ----------------- 7. Renderizado del componente -----------------
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Menú toggle */}
        <Menu />
        {/* ===== Contenido Principal ===== */}
        <div className="col-md-10 main-content">
          <h1>Reportes</h1>

          {/* 7.1. Botones de selección de reporte */}
          <div
            className="btn-group mb-4"
            role="group"
            aria-label="Tipos de reporte"
          >
            {botones.map((bot) => (
              <button
                key={bot.tipo}
                type="button"
                className={`btn btn-outline-primary ${reporte === bot.tipo ? "active" : ""
                  }`}
                onClick={() => handleReporte(bot.tipo)}
              >
                {bot.texto}
              </button>
            ))}
          </div>

          {/* 7.2. Bloque de filtros de fechas y botón “Generar” */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h5">Filtros</h2>
              <form onSubmit={generarReporte}>
                <div className="row">
                  {/* Fecha de inicio */}
                  <div className="col-md-5 mb-3">
                    <label htmlFor="fecha_inicio" className="form-label">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      className="form-control form-control-sm"
                      value={filtros.fecha_inicio}
                      onChange={handleFiltro}
                      required
                    />
                  </div>

                  {/* Fecha de fin */}
                  <div className="col-md-5 mb-3">
                    <label htmlFor="fecha_fin" className="form-label">
                      Fecha de fin
                    </label>
                    <input
                      type="date"
                      name="fecha_fin"
                      id="fecha_fin"
                      className="form-control form-control-sm"
                      value={filtros.fecha_fin}
                      onChange={handleFiltro}
                      required
                    />
                  </div>
                  {/* Input adicional: Número de empleado (solo para prestamos) */}
                  {reporte === "prestamos" && (
                    <div className="col-md-4 mb-3">
                      <label htmlFor="id_usuario" className="form-label">
                        Número de empleado
                      </label>
                      <input
                        type="text"
                        name="id_usuario"
                        id="id_usuario"
                        className="form-control form-control-sm"
                        placeholder="Ej. 12345"
                        value={filtros.id_usuario}
                        onChange={handleFiltro}
                        required
                      />
                    </div>
                  )}

                  {/* Botón Generar */}
                  <div className="col-md-2 d-flex align-items-end mb-3">
                    <button
                      type="submit"
                      className="btn btn-danger btn-sm w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Generando...
                        </>
                      ) : (
                        "Generar"
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Mensaje de error */}
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
          </div>

          {/* 7.3. Sección de resultados */}
          {loading && !resultados ? (
            // 7.3.1. Mientras carga, mostramos un spinner grande centrado
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : resultados && reporte === "salas" ? (
            // 7.3.2. Si ya tenemos datos (y el reporte es “salas”), mostramos la tabla y botones de descarga
            <div>
              {/* 7.3.2.1. Botones para exportar */}
              <div className="mb-3">
                <button
                  className="btn btn-success me-2 btn-sm"
                  onClick={descargarExcel}
                >
                  <i className="fas fa-file-excel me-1"></i> Descargar Excel
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={
                    DescargarPDF
                  } /*AQUI ESTA LA FUNCION PARA DESCARGAR EN PDF*/
                >
                  <i className="fas fa-file-pdf me-1"></i> Descargar PDF
                </button>
              </div>

              {/* 7.3.2.2. Tabla de resultados */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Matrícula</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Sala</th>
                      <th>Uso de Máquina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map((r) => (
                      <tr key={r.id_acceso}>
                        <td>{r.usuario.matricula}</td>
                        <td>{r.usuario.nombre}</td>
                        <td>
                          {r.usuario.apellido_paterno}{" "}
                          {r.usuario.apellido_materno}
                        </td>
                        <td>{r.fecha}</td>
                        <td>{r.hora}</td>
                        <td>{r.sala}</td>
                        <td>{r.uso_maquina}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : resultados && reporte === "estadisticas" ? (
            // 7.3.3. “Estadísticas generales”
            <div>
              <h2>
                Estadísticas Generales ({filtros.fecha_inicio} –{" "}
                {filtros.fecha_fin})
              </h2>
              <ul className="list-group mb-3">
                <li className="list-group-item">
                  <strong>Sala más ocupada:</strong>{" "}
                  {resultados.sala_mas_ocupada || "Ninguna"}
                </li>
                <li className="list-group-item">
                  <strong>Tipo de dispositivo más usado:</strong>{" "}
                  {resultados.tipo_dispositivo_mas_usado || "Ninguno"}
                </li>
                <li className="list-group-item">
                  <strong>
                    Cantidad de veces que un alumno usó un equipo:
                  </strong>{" "}
                  {resultados.veces_uso_equipo}
                </li>
                <li className="list-group-item">
                  <strong>Carrera que más ingresa:</strong>{" "}
                  {resultados.carrera_mas_ingresa || "Ninguna"}
                </li>
                <li className="list-group-item">
                  <strong>Cantidad de invitados:</strong>{" "}
                  {resultados.cantidad_invitados}
                </li>
              </ul>

              {/* Botón para exportar estas estadísticas a Excel */}
              <button
                className="btn btn-success me-2 btn-sm"
                onClick={() => {
                  const filasStats = [
                    {
                      "Sala más ocupada": resultados.sala_mas_ocupada,
                      "Tipo dispositivo más usado":
                        resultados.tipo_dispositivo_mas_usado,
                      "Veces uso equipo": resultados.veces_uso_equipo,
                      "Carrera más ingresa": resultados.carrera_mas_ingresa,
                      "Cantidad invitados": resultados.cantidad_invitados,
                    },
                  ];
                  const ws = XLSX.utils.json_to_sheet(filasStats);
                  const wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "Estadísticas");
                  const wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    type: "array",
                  });
                  const blob = new Blob([wbout], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                  });
                  saveAs(
                    blob,
                    `Estadisticas_${filtros.fecha_inicio}_a_${filtros.fecha_fin}.xlsx`
                  );
                }}
              >
                <i className="fas fa-file-excel me-1"></i> Exportar Estadísticas
                a Excel
              </button>

              {/* Botón para exportar estadísticas a PDF */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  const doc = new jsPDF("p", "mm", "a4");
                  doc.setFontSize(16);
                  doc.text(
                    `Estadísticas ${filtros.fecha_inicio} – ${filtros.fecha_fin}`,
                    14,
                    20
                  );
                  doc.setFontSize(11);
                  let y = 30;
                  const lineHeight = 8;
                  doc.text(
                    `Sala más ocupada: ${resultados.sala_mas_ocupada || "Ninguna"
                    }`,
                    14,
                    y
                  );
                  y += lineHeight;
                  doc.text(
                    `Tipo dispositivo más usado: ${resultados.tipo_dispositivo_mas_usado || "Ninguno"
                    }`,
                    14,
                    y
                  );
                  y += lineHeight;
                  doc.text(
                    `Veces uso equipo: ${resultados.veces_uso_equipo}`,
                    14,
                    y
                  );
                  y += lineHeight;
                  doc.text(
                    `Carrera más ingresa: ${resultados.carrera_mas_ingresa || "Ninguna"
                    }`,
                    14,
                    y
                  );
                  y += lineHeight;
                  doc.text(
                    `Cantidad invitados: ${resultados.cantidad_invitados}`,
                    14,
                    y
                  );

                  doc.save(
                    `Estadisticas_${filtros.fecha_inicio}_a_${filtros.fecha_fin}.pdf`
                  );
                }}
              >
                <i className="fas fa-file-pdf me-1"></i> Exportar Estadísticas a
                PDF
              </button>
            </div>
          ) : resultados && reporte === "prestamos" ? (
            /* 7.3.4. Bloque para “Solicitudes de Préstamos” */
            <div>
              <h2>
                Solicitudes de Préstamos ( {filtros.fecha_inicio} –{" "}
                {filtros.fecha_fin} , Empleado: {filtros.id_usuario} )
              </h2>

              {/* Recorremos cada préstamo en resultados */}
              {resultados.map((p) => (
                <div className="card mb-4" key={p.id_prestamo}>
                  <div className="card-body">
                    {/* Tabla de un solo préstamo */}
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped mb-3">
                        <thead className="table-dark">
                          <tr>
                            <th>Número de empleado</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Serie</th>
                            <th>Nro. Dispositivo</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Fecha</th>
                            <th>Hora inicio</th>
                            <th>Hora fin</th>
                            <th>Propósito</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{p.id_usuario}</td>
                            <td>{p.nombre}</td>
                            <td>
                              {p.apellido_paterno} {p.apellido_materno}
                            </td>
                            <td>{p.numero_serie}</td>
                            <td>{p.numero_dispositivo}</td>
                            <td>{p.tipo}</td>
                            <td>{p.marca}</td>
                            <td>{p.modelo}</td>
                            <td>{p.fecha}</td>
                            <td>{p.hora_inicio}</td>
                            <td>{p.hora_fin || "—"}</td>
                            <td>{p.proposito}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Botón para descargar en PDF este préstamo */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        // Creamos un PDF SOLO con este registro (p) usando jsPDF
                        const doc = new jsPDF("p", "mm", "a4");

                        // 1) Título: Préstamo de dispositivo
                        doc.setFontSize(16);
                        doc.text(`Préstamo N. ${p.id_prestamo}`, 14, 20);

                        // 2) Escribimos todos los campos debajo, línea por línea
                        doc.setFontSize(11);
                        let y = 30;
                        const lineHeight = 7;

                        doc.text(`Empleado (ID): ${p.id_usuario}`, 14, y);
                        y += lineHeight;
                        doc.text(`Nombre: ${p.nombre}`, 14, y);
                        y += lineHeight;
                        doc.text(
                          `Apellidos: ${p.apellido_paterno} ${p.apellido_materno}`,
                          14,
                          y
                        );
                        y += lineHeight;
                        doc.text(`Serie: ${p.numero_serie}`, 14, y);
                        y += lineHeight;
                        doc.text(
                          `Nro. Dispositivo: ${p.numero_dispositivo}`,
                          14,
                          y
                        );
                        y += lineHeight;
                        doc.text(`Tipo: ${p.tipo}`, 14, y);
                        y += lineHeight;
                        doc.text(`Marca: ${p.marca}`, 14, y);
                        y += lineHeight;
                        doc.text(`Modelo: ${p.modelo}`, 14, y);
                        y += lineHeight;
                        doc.text(`Fecha: ${p.fecha}`, 14, y);
                        y += lineHeight;
                        doc.text(`Hora inicio: ${p.hora_inicio}`, 14, y);
                        y += lineHeight;
                        doc.text(`Hora fin: ${p.hora_fin || "—"}`, 14, y);
                        y += lineHeight;
                        doc.text(`Propósito: ${p.proposito}`, 14, y);

                        // 3) Forzamos la descarga del PDF
                        doc.save(`Prestamo_${p.id_prestamo}.pdf`);
                      }}
                    >
                      <i className="fas fa-file-pdf me-1"></i> Descargar PDF
                    </button>
                  </div>
                </div>
              ))}

              {/* Si no hay préstamos en el rango y para ese empleado, mostrar mensaje */}
              {resultados.length === 0 && (
                <div className="alert alert-info">
                  No se encontraron solicitudes de préstamo para el empleado{" "}
                  {filtros.id_usuario}
                  entre {filtros.fecha_inicio} y {filtros.fecha_fin}.
                </div>
              )}
            </div>
          ) : (
            /* 7.3.5. Estado inicial o sin reporte seleccionado */
            <div className="text-center text-muted">
              {reporte === "salas" && !resultados && (
                <>Uso de salas: selecciona un rango de fechas.</>
              )}
              {reporte === "estadisticas" && !resultados && (
                <>
                  Estadísticas: selecciona un rango de fechas para visualizar
                  sus estadísticas.
                </>
              )}
              {reporte === "prestamos" && !resultados && (
                <>
                  Préstamos: selecciona un rango de fechas y coloca el número de
                  empleado para visualizar sus solicitudes de préstamos.
                </>
              )}
              {!reporte && (
                <>Selecciona un reporte y define un rango de fechas.</>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
