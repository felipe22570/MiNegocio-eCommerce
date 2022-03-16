import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
   loginEmailPassword,
   loginFacebook,
   loginGoogle,
   registroEmailPasswordNombre,
} from "../redux/actions/actionsLogin";
import "../styles/login/login.css";
import NavBar from "./NavBar";

const ContenedorLogin = styled.div`
   width: 70%;
   margin: 4rem auto;
   display: flex;
   justify-content: space-between;
   gap: 10%;
`;

const Login = () => {
   const dispatch = useDispatch();

   const loginFormik = useFormik({
      initialValues: {
         email: "",
         pass: "",
         pass2: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email().required(),
         pass: Yup.string()
            .required()
            .oneOf([Yup.ref("pass2")]),
         pass2: Yup.string().required(),
      }),
      onSubmit: (data) => {
         console.log(data);

         const { email, pass } = data;

         dispatch(loginEmailPassword(email, pass));
      },
   });

   const signupFormik = useFormik({
      initialValues: {
         name: "",
         email: "",
         pass: "",
         pass2: "",
      },
      validationSchema: Yup.object({
         name: Yup.string().required(),
         email: Yup.string().email().required(),
         pass: Yup.string()
            .required()
            .oneOf([Yup.ref("pass2")]),
         pass2: Yup.string().required(),
      }),
      onSubmit: (data) => {
         console.log(data);

         const { name, email, pass } = data;

         dispatch(registroEmailPasswordNombre(email, pass, name));

         Swal.fire({
            title: "Usuario registrado exitosamente!",
            icon: "success",
            confirmButtonText: "Continuar",
         });
      },
   });

   return (
      <div>
         <NavBar />
         <ContenedorLogin>
            <div className="login">
               <h2>Ingresa a tu cuenta:</h2>
               <form onSubmit={loginFormik.handleSubmit}>
                  <TextField
                     className="input"
                     label="Correo electrónico"
                     variant="filled"
                     name="email"
                     onChange={loginFormik.handleChange}
                  />
                  <TextField
                     className="input"
                     label="Contraseña"
                     type="password"
                     variant="filled"
                     name="pass"
                     onChange={loginFormik.handleChange}
                  />
                  <TextField
                     className="input"
                     label="Repite tu contraseña"
                     type="password"
                     variant="filled"
                     name="pass2"
                     onChange={loginFormik.handleChange}
                  />

                  <Button type="submit" className="boton" variant="contained" color="success">
                     Enviar
                  </Button>
               </form>

               <div className="redes">
                  <button onClick={() => dispatch(loginGoogle())}>
                     <img
                        src="https://res.cloudinary.com/dcane9asx/image/upload/v1646412788/5847f9cbcef1014c0b5e48c8_ahn6z7.png"
                        alt=""
                     />
                     Ingresa con Google
                  </button>

                  <button onClick={() => dispatch(loginFacebook())}>
                     <img
                        src="https://res.cloudinary.com/dcane9asx/image/upload/v1646522028/facebook_py8qjc.png"
                        alt=""
                     />
                     Ingresa con Facebook
                  </button>
               </div>
            </div>

            <div className="login">
               <h2>Aún no tienes cuenta? Registrate</h2>
               <form onSubmit={signupFormik.handleSubmit}>
                  <TextField
                     label="Nombre"
                     variant="filled"
                     name="name"
                     onChange={signupFormik.handleChange}
                  />
                  <TextField
                     label="Correo"
                     variant="filled"
                     name="email"
                     onChange={signupFormik.handleChange}
                  />
                  <TextField
                     label="Contraseña"
                     type="password"
                     variant="filled"
                     name="pass"
                     onChange={signupFormik.handleChange}
                  />
                  <TextField
                     label="Repite tu contraseña"
                     type="password"
                     variant="filled"
                     name="pass2"
                     onChange={signupFormik.handleChange}
                  />
                  <Button type="submit" className="boton" variant="contained" color="success">
                     Enviar
                  </Button>
               </form>
            </div>
         </ContenedorLogin>
      </div>
   );
};

export default Login;
