import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // alert("Session expired. Please login again.");

    localStorage.clear();

    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "Session expired. Please login again.",
        }}
      />
    );
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.clear();

      alert("Session expired. Please login again.");

      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.clear();

    alert("Session expired. Please login again.");

    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
