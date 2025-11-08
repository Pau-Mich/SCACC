// Es el componente principal de React donde se definen las rutas y se estructuran los demás componentes.
// Generalmente usa react-router-dom para la navegación entre Login, Register, Success, etc.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reservacion from "./pages/Reservacion";
import Panel_admin from "./pages/Panel_admin";
import PrestamosMain from "./pages/prestamos_main"; // Página principal de préstamos
import AgregarDispositivo from "./pages/agregar_dispositivo"; // Página para agregar dispositivos
import EliminarDispositivo from "./pages/eliminar_dispositivo"; // Página para eliminar dispositivos
import GestionUsuarios from "./pages/UserManagement"; // Página para gestionar usuarios
import Reportes from "./pages/Reportes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/panel_admin" element={<Panel_admin />} />
        <Route path="/reservacion" element={<Reservacion />} />
        {/* <Route path="/Invitado" element={<Invitado />} /> */}
        <Route path="/agregar_dispositivo" element={<AgregarDispositivo />} />
        <Route path="/eliminar_dispositivo" element={<EliminarDispositivo />} />
        <Route path="/prestamos_main" element={<PrestamosMain />} />
        <Route path="/gestion_usuarios" element={<GestionUsuarios />} />
        <Route path="/reportes" element={<Reportes />} />
        {/* <Route path="/uso_alumno" element={<UsoAlumno />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;