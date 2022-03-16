import { typesCarrito } from "../types/types";

const initialState = {
   carrito: [],
};

export const carritoReducers = (state = initialState, action) => {
   switch (action.type) {
      case typesCarrito.agregarCarrito:
         return {
            carrito: [action.payload],
         };

      case typesCarrito.listarCarrito:
         return {
            carrito: [...action.payload],
         };

      case typesCarrito.editarCarrito:
         return {
            ...state,
         };

      case typesCarrito.eliminarCarrito:
         return {
            carrito: state.carrito.filter((pro) => pro.product !== action.payload),
         };

      case typesCarrito.vaciarCarrito:
         return {
            carrito: [],
         };

      default:
         return state;
   }
};
