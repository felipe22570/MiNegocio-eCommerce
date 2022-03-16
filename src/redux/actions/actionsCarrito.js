import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   query,
   updateDoc,
   where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typesCarrito } from "../types/types";

export const agregarCarritoAsyn = (newProduct) => {
   return (dispatch) => {
      addDoc(collection(db, "carrito"), newProduct)
         .then((resp) => {
            dispatch(agregarCarritoSyn(newProduct));
         })
         .catch((error) => {
            console.log(error);
         });
   };
};

export const agregarCarritoSyn = (products) => {
   return {
      type: typesCarrito.agregarCarrito,
      payload: products,
   };
};

export const listarCarritoAsync = () => {
   return async (dispatch) => {
      const traerDatos = await getDocs(collection(db, "carrito"));
      const productos = [];
      traerDatos.forEach((doc) => {
         productos.push({
            ...doc.data(),
         });
      });
      dispatch(listarCarritoSyn(productos));
   };
};

export const listarCarritoSyn = (productos) => {
   return {
      type: typesCarrito.listarCarrito,
      payload: productos,
   };
};

export const editarCarritoAsyn = (name, producto) => {
   return async (dispatch) => {
      const traerCollection = collection(db, "carrito");
      const q = query(traerCollection, where("product", "==", name));
      const datosQ = await getDocs(q);
      let id;
      datosQ.forEach(async (docu) => {
         id = docu.id;
      });
      console.log(id);

      const docRef = doc(db, "carrito", id);
      await updateDoc(docRef, producto).then(() => listarCarritoAsync());
   };
};

export const editarCarritoSyn = (codigo, product) => {
   return {
      type: typesCarrito.editarCarrito,
      payload: product,
   };
};

export const eliminarCarritoAsyn = (name) => {
   return async (dispatch) => {
      const traerCollection = collection(db, "carrito");
      const q = query(traerCollection, where("product", "==", name));
      const datosQ = await getDocs(q);
      datosQ.forEach((docu) => {
         deleteDoc(doc(db, "carrito", docu.id));
      });
      dispatch(eliminarCarritoSyn(name));
   };
};

export const eliminarCarritoSyn = (name) => {
   return {
      type: typesCarrito.eliminarCarrito,
      payload: name,
   };
};

export const vaciarCarritoAsync = () => {
   return async (dispatch) => {
      const traerCollection = collection(db, "carrito");
      const datos = await getDocs(traerCollection);
      datos.forEach((docu) => {
         deleteDoc(doc(db, "carrito", docu.id));
      });
      dispatch(vaciarCarritoSync());
   };
};

export const vaciarCarritoSync = () => {
   return {
      type: typesCarrito.vaciarCarrito,
      payload: {},
   };
};
