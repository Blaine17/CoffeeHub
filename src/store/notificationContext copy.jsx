import { createContext, useReducer, useEffect } from "react";

import loginService from '../services/login'

const reducer = (state, action) => {
 
  if (action.type === 'SET') {
    return action.payload
  }
  if (action.type === 'CLEAR') {
    return null
  }
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(reducer, null)



  return (<NotificationContext.Provider value={[user, userDispatch]} >
    {props.children}
  </NotificationContext.Provider>
  )
}

export default NotificationContext