import {
  useState,
  Fragment,
  useRef,
  forwardRef,
  useEffect,
  createContext,
  useReducer,
  useContext
} from "react";

import test from "../services/test";



export const authenticate = (user, callback, removeUser) => {
  useEffect(() => {
    test.test(user, callback).catch(error => {
      removeUser()
    })
  }, [])
}

export default authenticate
