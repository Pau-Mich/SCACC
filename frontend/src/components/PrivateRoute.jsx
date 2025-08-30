import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated"); 
  // 👆 puedes usar sessionStorage o un contexto global (AuthContext)

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
