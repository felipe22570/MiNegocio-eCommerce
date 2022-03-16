import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/navbar/navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listarCarritoAsync } from "../redux/actions/actionsCarrito";
import { logoutAsync } from "../redux/actions/actionsLogin";

const NavBar = () => {
   const dispatch = useDispatch();

   const { carrito } = useSelector((store) => store.carrito);
   const user = useSelector((store) => store.login);

   const [usuario, setUsuario] = useState("Iniciar sesión");
   const [boton, setBoton] = useState("hidden");

   const handleLogout = () => {
      dispatch(logoutAsync());
   };

   useEffect(() => {
      dispatch(listarCarritoAsync());

      const verificarUsuario = () => {
         if (Object.keys(user).length !== 0) {
            setUsuario("Hola, " + user.name);
            setBoton("boton-salir");
         } else {
            setUsuario("Iniciar sesión");
            setBoton("hidden");
         }
      };
      verificarUsuario();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

   return (
      <div className="navbar">
         <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <div className="navbar-logo">
               <img
                  src="https://res.cloudinary.com/dcane9asx/image/upload/v1647279042/klipartz.com_dtdnyk.png"
                  alt=""
               />
               <span>Mi mercado</span>
            </div>
         </Link>
         <div className="navbar-info-user">
            <Link to="login" style={{ textDecoration: "none", color: "black" }}>
               <span>{usuario}</span>
            </Link>
            <button className={boton} onClick={handleLogout}>
               Salir
            </button>
         </div>

         <div className="navbar-cart">
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
               <Badge badgeContent={Object.keys(carrito).length} color="primary">
                  <ShoppingCartIcon sx={{ fontSize: "2.2rem" }} />
               </Badge>
            </Link>
         </div>
      </div>
   );
};

export default NavBar;
