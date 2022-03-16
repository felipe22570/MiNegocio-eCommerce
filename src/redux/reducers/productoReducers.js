import { typesProducto } from "../types/types";

const initialState = {
   productos: [],
};

export const productoReducer = (state = initialState, action) => {
   switch (action.type) {
      case typesProducto.listarProducto:
         return {
            productos: [...action.payload],
         };

      case typesProducto.editarProducto:
         let productoEditado = state.productos.map((e) =>
            e.product === action.payload.product ? action.payload : e
         );

         return {
            productos: productoEditado,
         };

      default:
         return state;
   }
};
