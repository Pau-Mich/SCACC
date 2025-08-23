import { Link } from "react-router-dom";
import officeDesk from "../images/office-desk.png";
const menu_dispositivos = () => {
  return (
    <div className="dispositivos-actuales">
      <img
        src={officeDesk}
        alt="img_prestamo"
        className="slider-image"
        width="200"
        height="200"
      />
      <h2>Dispositivos actuales</h2>
      <Link to="/agregar_dispositivo">Agregar dispositivo</Link>
      <Link to="/eliminar_dispositivo">Eliminar dispositivo</Link>
    </div>
  );
};

export default menu_dispositivos;
