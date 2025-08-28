import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reservacion from "./pages/Reservacion";
import Panel_admin from "./pages/Panel_admin";
import PrestamosMain from "./pages/prestamos_main";
import AgregarDispositivo from "./pages/agregar_dispositivo";
import EliminarDispositivo from "./pages/eliminar_dispositivo";
import GestionUsuarios from "./pages/UserManagement";
import Reportes from "./pages/Reportes";
import PrivateRoute from "./components/PrivateRoute"; // Importamos el wrapper

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login abierto */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/panel_admin"
          element={
            <PrivateRoute>
              <Panel_admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservacion"
          element={
            <PrivateRoute>
              <Reservacion />
            </PrivateRoute>
          }
        />
        <Route
          path="/agregar_dispositivo"
          element={
            <PrivateRoute>
              <AgregarDispositivo />
            </PrivateRoute>
          }
        />
        <Route
          path="/eliminar_dispositivo"
          element={
            <PrivateRoute>
              <EliminarDispositivo />
            </PrivateRoute>
          }
        />
        <Route
          path="/prestamos_main"
          element={
            <PrivateRoute>
              <PrestamosMain />
            </PrivateRoute>
          }
        />
        <Route
          path="/gestion_usuarios"
          element={
            <PrivateRoute>
              <GestionUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <PrivateRoute>
              <Reportes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
