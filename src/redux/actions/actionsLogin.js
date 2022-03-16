import {
   createUserWithEmailAndPassword,
   getAuth,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { facebook, google } from "../../firebase/firebaseConfig";
import { typesLogin } from "../types/types";

export const loginEmailPassword = (email, password) => {
   return (dispatch) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            dispatch(loginSync(user.uid, user.displayName));
            console.log("Bienvenid@");
         })
         .catch((e) => {
            console.log("El usuario no existe");
            Swal.fire({
               title: "El usuario ingresado no existe",
               icon: "error",
               confirmButtonText: "Continuar",
            });
         });
   };
};

export const loginGoogle = () => {
   return (dispatch) => {
      const auth = getAuth();
      signInWithPopup(auth, google)
         .then(({ user }) => {
            dispatch(loginSync(user.uid, user.displayName));
            console.log(`Bienvenid@ ${user.displayName}`);
         })
         .catch((e) => {
            console.log(e);
         });
   };
};

export const loginFacebook = () => {
   return (dispatch) => {
      const auth = getAuth();
      signInWithPopup(auth, facebook)
         .then(({ user }) => {
            dispatch(loginSync(user.uid, user.displayName));
            console.log(`Bienvenid@ ${user.displayName}`);
         })
         .catch((e) => {
            console.log(e);
         });
   };
};

export const loginSync = (id, displayname) => {
   return {
      type: typesLogin.login,
      payload: {
         id,
         displayname,
      },
   };
};

export const logoutAsync = () => {
   return (dispatch) => {
      const auth = getAuth();
      signOut(auth)
         .then((user) => {
            dispatch(logoutSync());
         })
         .catch((error) => {
            console.log(error);
         });
   };
};

export const logoutSync = () => {
   return {
      type: typesLogin.logout,
   };
};

export const registroEmailPasswordNombre = (email, password, name) => {
   return (dispatch) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
         .then(async ({ user }) => {
            await updateProfile(auth.currentUser, { displayName: name });

            dispatch(registroSync(user.email, user.uid, user.displayName));
            dispatch(loginSync(user.uid, user.displayName));
         })
         .catch((e) => {
            console.log(e);
         });
   };
};

export const registroSync = (email, password, name) => {
   return {
      type: typesLogin.signup,
      payload: {
         email,
         password,
         name,
      },
   };
};
