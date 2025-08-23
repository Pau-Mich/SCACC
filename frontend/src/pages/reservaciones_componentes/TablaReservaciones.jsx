import React from 'react';

const TablaReservaciones = ({ currentWeekStart, reservaciones }) => {
  // Generar horas de 7:00 a 19:00
  const horas = Array.from({ length: 13 }, (_, i) => `${i + 7}:00`.padStart(5, '0'));

  // Días de la semana (Lunes a Viernes)
  const diasSemana = [0, 1, 2, 3, 4].map(offset => {
    const fecha = new Date(currentWeekStart);
    fecha.setDate(currentWeekStart.getDate() + offset);
    fecha.setHours(0, 0, 0, 0);
    return fecha;
  });

  // Función para verificar si una reserva aplica a un día específico
  const reservaAplicaADia = (reserva, fecha) => {
    const fechaInicio = new Date(reserva.fecha_inicio);
    const fechaFin = new Date(reserva.fecha_fin);
    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(0, 0, 0, 0);

    // Si no es recurrente, solo verifica el rango de fechas
    if (reserva.modalidad !== 'semestral') {
      return fecha >= fechaInicio && fecha <= fechaFin;
    }

    // Para reservas recurrentes, verifica:
    // 1. Que la fecha esté dentro del rango
    // 2. Que sea el día de la semana correcto
    const diaSemanaReserva = reserva.dia_semana?.toLowerCase();
    const diasMap = {
      'lunes': 0,
      'martes': 1,
      'miércoles': 2,
      'miercoles': 2,
      'jueves': 3,
      'viernes': 4
    };
    const diaNumero = diasMap[diaSemanaReserva];

    return (
      fecha >= fechaInicio &&
      fecha <= fechaFin &&
      fecha.getDay() === (diaNumero + 1) % 7 // Ajuste para Date.getDay() (0=Domingo)
    );
  };

  // Obtener reservaciones para un día y hora específicos
  const getReservacionesDiaHora = (fecha, hora) => {
    return reservaciones.filter(reserva => {
      // Verificar si aplica al día
      if (!reservaAplicaADia(reserva, fecha)) return false;

      // Verificar la hora
      const horaReserva = reserva.horario?.hora_inicio?.substring(0, 5);
      return horaReserva === hora;
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered text-center mt-3">
        <thead className="table-dark">
          <tr>
            <th>Horario</th>
            {diasSemana.map((fecha, index) => (
              <th key={index}>
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'][index]}<br />
                <small>{fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.map((hora, horaIndex) => (
            <tr key={horaIndex}>
              <td>{hora} - {`${parseInt(hora) + 1}:00`.padStart(5, '0')}</td>
              
              {diasSemana.map((fecha, diaIndex) => {
                const reservas = getReservacionesDiaHora(fecha, hora);
                
                return (
                  <td key={diaIndex}>
                    {reservas.length > 0 ? (
                      reservas.map((reserva, idx) => (
                        <div key={idx} className="bg-light p-1 mb-1 rounded small">
                          <div className="fw-bold">
                            {reserva.usuario?.nombre} {reserva.usuario?.apellido_paterno}
                          </div>
                          <div>Sala: {reserva.sala}</div>
                          {reserva.modalidad === 'semestral' && (
                            <div className="text-muted">Recurrente: {reserva.dia_semana}</div>
                          )}
                          <div>
                            <small className="text-muted">{reserva.materia} - {reserva.semestre} {reserva.grupo}</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted small">Disponible</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaReservaciones;