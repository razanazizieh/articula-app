import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const savedData = JSON.parse(localStorage.getItem("theUserData"));

  if (!savedData || !savedData.csrf_token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
