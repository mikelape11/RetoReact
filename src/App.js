import React, { createContext, useReducer, useEffect } from "react";
import "./App.css";

import Router from "./router";
import Login from "./pages/Login";
import jwt from "jsonwebtoken";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //Para el efecto dl horno
    localStorage.removeItem("furnaceTemp");

    const user = JSON.parse(localStorage.getItem("user") || null);
    const token = JSON.parse(localStorage.getItem("token"));

    var decodedToken = jwt.decode(token, { complete: true });

    var dateNow = new Date();
    const valid_token = decodedToken && decodedToken.payload.exp * 1000 > dateNow.getTime();

    console.log(
      "valid_token",
      valid_token,
      decodedToken,
      decodedToken && decodedToken.payload && decodedToken.payload.exp * 1000,
      dateNow.getTime()
    );
    if (user && valid_token) {
      dispatch({
        type: "LOGIN",
        payload: { user, token },
      });
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">{!state.isAuthenticated ? <Login /> : <Router />}</div>
    </AuthContext.Provider>
  );
};

export default App;