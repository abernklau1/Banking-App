import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { accNumber } = useAppContext();
  if (!accNumber) {
    return <Navigate to="/make-account" />;
  }
  return children;
};

export default ProtectedRoute;
