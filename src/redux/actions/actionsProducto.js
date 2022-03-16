import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typesProducto } from "../types/types";

export const listarProductoAsync = () => {
   return async (dispatch) => {
      const traerDatos = await getDocs(collection(db, "productos"));
      const productos = [];
      traerDatos.forEach((doc) => {
         productos.push({
            ...doc.data(),
         });
      });
      dispatch(listarProductoSyn(productos));
   };
};

export const listarProductoSyn = (productos) => {
   return {
      type: typesProducto.listarProducto,
      payload: productos,
   };
};

export const editarProductoSyn = (producto) => {
   return {
      type: typesProducto.editarProducto,
      payload: producto,
   };
};
