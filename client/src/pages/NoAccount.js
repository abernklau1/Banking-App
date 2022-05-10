import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { account } = useAppContext();
  if (!account) {
    return <Navigate to="/make-account" />;
  }
  return children;
};

export default ProtectedRoute;
