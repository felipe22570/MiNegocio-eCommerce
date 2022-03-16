import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ isAuthenticated, children }) => {
   return isAuthenticated === false ? children : <Navigate to="/" />;
};

export default PublicRoutes;
