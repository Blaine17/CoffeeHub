import {
  useState,
  Fragment,
  useRef,
  forwardRef,
  useEffect,
  createContext,
  useReducer,
  useContext,
} from "react";

import { useLocation } from "react-router-dom";

import authenticateUser from "../services/authenticate";

export const authenticate = (user, callback, removeUser) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    authenticateUser.authenticateUser(user, callback).catch((error) => {
      //if there was an error authenticating user log user out
      removeUser();
    });
  }, [location]);
};

export default authenticate;
