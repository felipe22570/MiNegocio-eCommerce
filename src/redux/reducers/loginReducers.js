import { typesLogin } from "../types/types";

export const loginReducer = (state = {}, action) => {
   switch (action.type) {
      case typesLogin.login:
         return {
            id: action.payload.id,
            name: action.payload.displayname,
         };

      case typesLogin.logout:
         return {};

      case typesLogin.register:
         return {
            email: action.payload.email,
            password: action.payload.password,
            name: action.payload.name,
         };

      default:
         return state;
   }
};
