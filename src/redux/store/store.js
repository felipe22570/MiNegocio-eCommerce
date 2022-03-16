import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { carritoReducers } from "../reducers/carritoReducers";
import { loginReducer } from "../reducers/loginReducers";
import { productoReducer } from "../reducers/productoReducers";

const composeEnhancers =
   (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
   login: loginReducer,
   productos: productoReducer,
   carrito: carritoReducers,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
