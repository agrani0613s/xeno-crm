import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={`/login?message=Please log in first&redirect=${location.pathname}`} />
    );
  }

  return children;
}

export default ProtectedRoute;
