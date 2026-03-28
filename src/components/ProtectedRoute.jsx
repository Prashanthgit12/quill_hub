import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { loginData } from "../App";

const ProtectedRoute = ({ children, role }) => {
  const { login } = useContext(loginData);
  if (!login.status) {
    return <Navigate to="/" />;
  }
  if (role && login.user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;