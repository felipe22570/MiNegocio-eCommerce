import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   editarCarritoAsyn,
   eliminarCarritoAsyn,
   listarCarritoAsync,
   vaciarCarritoAsync,
} from "../redux/actions/actionsCarrito";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Carrito = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { carrito } = useSelector((store) => store.carrito);
   const { productos } = useSelector((store) => store.productos);

   const [precioTotal, setPrecioTotal] = useState();

   const shippingCost = 7;

   const aumentar = (elemento) => {
      const [valorInicial] = productos.filter((p) => p.product === elemento.product);
      const precioInicial = valorInicial.price;

      const newProduct = elemento;

      newProduct.items = newProduct.items + 1;
      newProduct.price = precioInicial * newProduct.items;

      dispatch(editarCarritoAsyn(newProduct.product, newProduct));
   };

   const disminuir = (elemento) => {
      const [valorInicial] = productos.filter((p) => p.product === elemento.product);
      const precioInicial = valorInicial.price;

      const newProduct = elemento;

      if (newProduct.items > 1) {
         newProduct.items = newProduct.items - 1;
         newProduct.price = precioInicial * newProduct.items;
      }
      dispatch(editarCarritoAsyn(newProduct.product, newProduct));
   };

   const sumarPrecios = () => {
      let element = 0;

      carrito.forEach((elem) => {
         element = Number(element) + Number(elem.price);
      });

      setPrecioTotal(element);
   };

   const pagarCarrito = () => {
      if (Object.keys(carrito).length !== 0) {
         Swal.fire({
            title: "Pago realizado exitosamente!",
            icon: "success",
            confirmButtonText: "Continuar",
         });
         dispatch(vaciarCarritoAsync());
         navigate("/");
      } else {
         Swal.fire({
            title: "No hay productos en el carrito",
            icon: "warning",
            confirmButtonText: "Continuar",
         });
      }
   };

   useEffect(() => {
      dispatch(listarCarritoAsync());
      sumarPrecios();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [carrito]);

   return (
      <div>
         <NavBar />
         <div className="cont-carrito">
            <h1>Carrito</h1>
            <div className="carrito-list">
               {carrito.map((c, index) => (
                  <div className="carrito-product" key={index}>
                     <img src={c.image} alt="" />
                     <h3>{c.product}</h3>
                     <div className="product-items">
                        <button onClick={() => disminuir(c)}>-</button>
                        <span>{c.items}</span>
                        <button onClick={() => aumentar(c)}>+</button>
                     </div>
                     <span>{c.price.toFixed(2)} $</span>
                     <button
                        className="eliminar"
                        onClick={() => dispatch(eliminarCarritoAsyn(c.product))}
                     >
                        <DeleteIcon sx={{ color: "white" }} />
                     </button>
                  </div>
               ))}

               <div className="carrito-pago">
                  <span>Items: {Object.keys(carrito).length}</span>
                  <div className="precio">
                     <span>Subtotal: </span>
                     <span>{precioTotal} $</span>
                  </div>
                  <div className="precio">
                     <span>Gastos de envío: </span>
                     <span>{shippingCost} $</span>
                  </div>
                  <div className="precio">
                     <h3>Total: </h3>
                     <span style={{ fontSize: "1.4rem", color: "green" }}>
                        <b>{(precioTotal + shippingCost).toFixed(2)} $</b>
                     </span>
                  </div>
               </div>

               <div className="enviar">
                  <Button
                     className="boton"
                     variant="contained"
                     color="success"
                     onClick={() => pagarCarrito()}
                  >
                     Pagar
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Carrito;
