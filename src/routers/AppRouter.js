import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carrito from "../components/Carrito";
import Login from "../components/Login";
import Main from "../components/Main";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [checking, setChecking] = useState(false);

   useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
         if (user?.uid) {
            setIsLoggedIn(true);
         } else {
            setIsLoggedIn(false);
         }
         setChecking(false);
      });
   }, []);
   if (checking) {
      return <h1>Espere...</h1>;
   }

   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/login"
               element={
                  <PublicRoutes isAuthenticated={isLoggedIn}>
                     <Login />
                  </PublicRoutes>
               }
            />

            <Route path="/" element={<Main />} />

            <Route
               path="/cart"
               element={
                  <PrivateRoutes isAuthenticated={isLoggedIn}>
                     <Carrito />
                  </PrivateRoutes>
               }
            />
         </Routes>
      </BrowserRouter>
   );
};

export default AppRouter;
