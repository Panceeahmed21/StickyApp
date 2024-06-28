import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("userToken") !== null) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
