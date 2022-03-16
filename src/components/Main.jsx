import React, { useEffect } from "react";
import "../styles/main/main.css";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { editarProductoSyn, listarProductoAsync } from "../redux/actions/actionsProducto";
import { useSelector } from "react-redux";
import "../styles/carrito/carrito.css";
import { agregarCarritoAsyn, listarCarritoAsync } from "../redux/actions/actionsCarrito";
import NavBar from "./NavBar";
import Swal from "sweetalert2";

const Main = () => {
   const dispatch = useDispatch();

   const { productos } = useSelector((store) => store.productos);

   const selectedProducts = productos.filter((p) => p.selected === true);

   const editarProd = (prod) => {
      const newProd = prod;

      if (newProd.selected) {
         newProd.selected = false;
      } else {
         newProd.selected = true;
      }

      dispatch(editarProductoSyn(newProd));
   };

   const mandarACarrito = () => {
      if (Object.keys(selectedProducts).length !== 0) {
         selectedProducts.forEach((element) => {
            dispatch(agregarCarritoAsyn(element));
         });

         dispatch(listarCarritoAsync());

         Swal.fire({
            title: "Productos enviados al carrito correctamente!",
            icon: "success",
            confirmButtonText: "Continuar",
         });
      } else {
         Swal.fire({
            title: "No hay productos seleccionados",
            icon: "warning",
            confirmButtonText: "Continuar",
         });
      }
   };

   useEffect(() => {
      dispatch(listarProductoAsync());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div>
         <NavBar />
         <div className="cont-main">
            <div className="banner">
               <span>Tu menú favorito al mejor precio!</span>
            </div>

            <div className="detail">
               <h1>Plato del día</h1>
               <div className="plato">
                  <img
                     src="https://res.cloudinary.com/dcane9asx/image/upload/v1647301371/What-To-Serve-With-Risotto-sq_p5mhqa.webp"
                     alt=""
                  />
                  <div className="plato-info">
                     <h2>Risotto</h2>
                     <span>
                        El risotto es una comida tradicional italiana realizada añadiendo
                        gradualmente un caldo al arroz, junto con otros ingredientes que varían
                        según las específicas recetas de risottos. Es uno de los modos más comunes
                        de cocinar arroz en Italia. Es una comida originaria de la zona noroeste del
                        país, concretamente del este de Piamonte, de Lombardía y de la zona de
                        Verona, debido a la abundancia de arroz de estas tierras.
                     </span>
                  </div>
               </div>
            </div>

            <div className="products">
               <h1>Ingredientes</h1>
               <span>Agrega los productos que desees comprar a tu carrito:</span>
               <div className="list-products">
                  {productos.map((p, index) => (
                     <div className="card-product" key={index}>
                        <Checkbox onChange={() => editarProd(p)} />
                        <img src={p.image} alt="" />
                        <div className="product-name">
                           <h4>{p.product}</h4>
                           <span>{p.brand}</span>
                        </div>
                        <span>{p.quantity}</span>
                        <span>$ {p.price}</span>
                     </div>
                  ))}
               </div>

               <div className="send-carrito">
                  <h3>Productos seleccionados: {Object.keys(selectedProducts).length}</h3>
                  <button onClick={() => mandarACarrito()}>Mandar a carrito</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Main;
